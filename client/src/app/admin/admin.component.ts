import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from "./admin.service";
import { Product, ProductService, Brand, Category, Model, SearchOptions } from "../product/services/product.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private element: ElementRef, private productService: ProductService) { }

  productsViewList: Array<Product>;
  fullproductList: Array<Product>;
  selectedProductDropdownOption: "Category" | "Brand" | "Model";
  sectedCommonOption: any;
  searachOptions: SearchOptions;
  image: any;
  formData: FormData;
  listOfProductOption: CommonDto[];
  brandList: Array<Brand> = null;
  categroyList: Array<Category> = null;
  modelList: Array<Model> = [];
  isLoading = true;

  ngOnInit() {
    // this.selectedProductDropdownOption = "Category";
    // this.sectedCommonOption = "Repair Parts";
    this.productService.getBrands()
      .subscribe((brands) => {
        this.brandList = brands

        for(let i = 0; i < this.brandList.length; i ++) {

          console.log('model lenght', this.brandList.length);
          console.log('model vaule', this.brandList[i].models);

          this.brandList[i].models.forEach((model) => this.modelList.push({modelId: model.modelId, modelName: model.modelName, description: model.description, quantity: model.quantity, image: model.image }));
        }
      });
    this.productService.getCategories()
      .subscribe((categories) => this.categroyList = categories);
    this.productService.getProducts({})
      .subscribe((productList) => {
        this.fullproductList = productList;
        this.loadProductsToView();
        this.isLoading = false;
      });

      console.log('list of model', this.modelList)
  }
  
  getProducts(options: SearchOptions) {
    return this.productService.getProducts(options);
  }
  test(obj){
    console.log(obj);
  }
  loadProductsToView() {
    // console.log(options);
    let commonDto = this.sectedCommonOption;
    console.log( commonDto);
    if(!commonDto)
      this.productsViewList = this.fullproductList;
    if(this.selectedProductDropdownOption == "Brand")
      this.productsViewList = this.fullproductList.filter((product) => product.brandId == commonDto);
    if(this.selectedProductDropdownOption == "Category")
      this.productsViewList = this.fullproductList.filter((product) => product.categoryId == commonDto);
    console.log(this.productsViewList);
  }
  addImage(product: Product, index: number) {
    const element: any = (document.querySelectorAll('#file-input')[index]);
    console.log('image', element.files[0]);
   // console.log('Event', event.target.files[0]);
    this.image = element.files[0];

    this.formData = new FormData();
    this.formData.append('file', this.image);
    this.adminService.addImage(product.productId, this.formData);
}

onProductDropdownChoose(): void {
 if (this.selectedProductDropdownOption === 'Brand') {
    this.listOfProductOption = [] ; 
    this.brandList.forEach((brand) => this.listOfProductOption.push({id: brand.brandId, name: brand.brandName}));
    console.log("List of options", this.listOfProductOption);
  }
  // tslint:disable-next-line:one-line
  else if (this.selectedProductDropdownOption === 'Category') {
    this.listOfProductOption = [] ; 
    this.categroyList.forEach((category) => this.listOfProductOption.push({id: category.categoryId, name: category.categoryName}));
    console.log("List of options", this.listOfProductOption);
    }
  // tslint:disable-next-line:one-line
  else if (this.selectedProductDropdownOption === 'Model') {

  this.listOfProductOption = [];
  this.modelList.forEach((model) => this.listOfProductOption.push({id: model.modelId, name: model.modelName}));
  console.log('list of model option', this.listOfProductOption)
  }
}

}
export class CommonDto {
  name: string;
  id: number;
  // description: string;
}
