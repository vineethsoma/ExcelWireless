import { Component, OnInit, ElementRef } from '@angular/core';
import { AdminService } from "./admin.service";
import { Product } from "../product/services/product.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService, private element: ElementRef) { }

  image: any;
  formData: FormData;
  productDto: Product[];
  selectedProductDropdownOption: string;
  listOfProductOption: CommonDto[];
  menuList: MenuDto[] = null;
  webBrandDtoList: WebBrandDto[];

  ngOnInit() {
    // this.getProduct();
    this.getWebMenu();
  }

  addImage(product: Product) {
    const element: any = (document.querySelectorAll('#file-input')[0]);
    console.log('image', element.files[0]);
   // console.log('Event', event.target.files[0]);
    this.image = element.files[0];

    this.formData = new FormData();
    this.formData.append('file', this.image);
    this.adminService.addImage(product.productId, this.formData);
}

getProduct() {
  this.adminService.getProduct()
  .subscribe((product: Product[]) => {
    this.productDto = product;
    console.log('Product Details for Admin page', this.productDto);
  });
}
getWebMenu() {
  this.adminService.getWebMenu()
  .subscribe((menu: MenuDto[]) => {
    this.menuList = menu;
    console.log('Product Details for Admin page', this.menuList);
  });
}

onProductDropdownChoose(): void {
 if (this.selectedProductDropdownOption === 'Brand') {
    console.log('inside the if for brand');
    console.log('Choose from drop down', this.selectedProductDropdownOption);
    console.log('Webbrand Dto From Menu List', this.webBrandDtoList);

    console.log('listOfProduct before', this.listOfProductOption);
    // console.log('webbrand count', this.webBrandDto[0].);
    // for (let i = 0; i < this.webBrandDto.length; i ++) {

    //   console.log('brans', this.webBrandDto[i].brandName);
    //   this.listOfProductOption[i].name = this.webBrandDto[i].brandName;
    //   console.log('listOfProduct before', this.listOfProductOption);
    // }
    console.log('listOfProduct after', this.listOfProductOption);
  }
  // tslint:disable-next-line:one-line
  else if (this.selectedProductDropdownOption === 'Category') {
          // console.log('inside the if for brand');

          this.adminService.getCategoryDetails()
          .subscribe((categories: Category[]) => {
          // this.listOfProductOption = categories;
        });
    }
  // tslint:disable-next-line:one-line
  else if (this.selectedProductDropdownOption === 'Vendor') {
    this.adminService.getVendorDetails()
    .subscribe((vendors: Vendor[]) => {
    // this.listOfProductOption = vendors;
        });
}
  // tslint:disable-next-line:one-line
  else if (this.selectedProductDropdownOption === 'Model') {
    this.adminService.getModelDetails()
    .subscribe((models: Model[]) => {
    // this.listOfProductOption = models;
        });
  }
      // tslint:disable-next-line:one-line
      // else {
      //     this.listOfProductOption = null;
      // }
}

}
export class MenuDto {
  // List<CategoryDto>
  categoryDtoList: Category[];
  webBrandDtoList: WebBrandDto[];
  // List<WebBrandDto> webBrandDtoList;
  // List<ModelDto> modelDtoList;
}
export class WebBrandDto {
   brandId: number;
   brandName: string;
   modelDtoList: Model[];
}
export class Category {
  categoryId: number;
  name: string;
  description: string;

}
export class Brand {
  brandId: number;
  name: string;
  description: string;
}

export class Vendor {
  vendorId: number;
  name: string;
  description: string;
}

export class Model {
  modelId: number;
  name: string;
  description: string;
}
export class CommonDto {
  name: string;
  id: number;
  // description: string;
}
