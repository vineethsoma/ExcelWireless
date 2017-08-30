import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";
import { ParamMap } from "@angular/router";
@Injectable()
export class ProductService {
  private url: string;
  constructor(private http: Http) {
    this.url = environment.productUrl;
  }

  getProducts(options: ProductOptions): Observable<Array<Product>>{
      return Observable.defer(() => this.productsHttpRequest(options))
      .publishReplay(100, 10000)
      .refCount()
      .take(1); 
  }

  getBrands(){
    return this.brandsHttpRequest();
  }

  getCategories(){
    return this.webMenuHttpRequest()
    .map((menu) => {
      let categories = [];
      menu.categoryDtoList.forEach((categoryDTO) => categories.push(new Category(categoryDTO)))
    
      return categories;
    })
  }

  private brandsHttpRequest(): Observable<Array<Brand>>{
    return this.webMenuHttpRequest().map(
      (menu) => {
      let brands = [];
        menu.webBrandDtoList.forEach(
          (brand) => brands.push(new Brand(brand))
        );
      
      return brands; 
      });
  }
  webMenuHttpRequest(): Observable<WebMenuDTO>{
    let url = this.url + "/getWebMenu";
    return this.http.get(url)
    .map(this.extractData)
    .catch(this.handleError);

  }

  productsHttpRequest(options: ProductOptions){
    const {categoryId} = options;
    // console.log(categoryId);
    let url =this.url+ "/getProduct";
    if(categoryId){
      url = this.url+'/getProductsByCategory?category_Id=' + categoryId;
    }
    return this.http.get(url)
      .map(this.extractData)
      .map((data) => {
        let productList = [];
        data.forEach((item) => {
          productList.push(new Product(item));
        });

        return productList;
      })
      .catch(this.handleError);
  }
  private extractData(res: Response): Array<ProductDTO> {
    let body = res.json();
    // console.log(body);
    return body || {};
  }
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
export class ProductOptions {
  categoryId?: number;
}
interface ProductDTO {
  productId: number;
  categoryId: number;
  vendorId: number;
  brandId: number;
  modelId: number;
  productNo: string;
  description: string;
  costPrice: number;
  markup: number;
  retailPrice: number;
  quantity: number;
  image: string;
  addTax: false;
}
export class Category{
  categoryId: number;
  categoryName: string;
  
  constructor(options: CatergoryDTO){
    this.categoryId = options.categoryId;
    this.categoryName = options.categoryName;
  }
}
export class Brand {
  brandId: number;
  brandName: string;
  models: Array<Model>;
  
  constructor(options: BrandDTO){
    this.brandId = options.brandId;
    this.brandName = options.brandName;
    this.models = [];
    options.modelDtoList.forEach((model) => this.models.push(new Model(model)));
  }
}
export class Model{
  modelId: number;
  modelName: string;
  description: string;
  quantity: number;
  constructor(options: ModelDTO){
    this.modelId = options.modelId;
    this.modelName = options.modelName;
    this.description = options.description;
    this.quantity = options.noOfProducts;
  }
}
export class Product {
 productId: number;
 productNo: number;
 description: string;
 image: string;
 retailPrice: number;
 costPrice: number;
 quantity: number;
brandId: number;
categoryId: number;
 constructor(dto: ProductDTO) {
    this.productId = dto.productId;
    this.image = dto.image;
    this.description = dto.description;
    this.retailPrice = dto.retailPrice;
    this.costPrice = dto.costPrice;
    this.brandId = dto.brandId;
    this.categoryId = dto.categoryId;
 }
}
interface WebMenuDTO{
  webBrandDtoList: Array<BrandDTO>;
  categoryDtoList: Array<any>;
}
interface CatergoryDTO{
  categoryId: number;
  categoryName: string;
  description: string;
  noOfProducts: number;
  filterValue: string;

}
interface BrandDTO{
  brandId: number;
  brandName: string;
  modelDtoList: Array<ModelDTO>; 
}

interface ModelDTO{
  modelId: number;
  modelName: string;
  description: string;
  noOfProducts: 0; 
}
export class SearchOptions extends ProductOptions {
  page?: number;
  pageSize?: number;
  sortOrder?: 'price-asc' | 'price-dsc' | 'description-asc' | 'description-dsc'

  constructor(params?: ParamMap){
    super();
    if(params){
      this.categoryId = +params.get("categoryId");
      this.pageSize = +params.get("pageSize");
      this.page = +params.get("page");
      this.sortOrder = <'price-asc' | 'price-dsc' | 'description-asc' | 'description-dsc'>params.get("sortOrder");
    }
    else{
      this.categoryId = 1;
      this.page = 1;
      this.pageSize = 10;
    }
  } 
}