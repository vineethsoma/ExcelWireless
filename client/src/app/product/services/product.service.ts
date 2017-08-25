import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from "rxjs";
@Injectable()
export class ProductService {
  private url: string; 
  constructor(private http: Http) { 
    this.url = environment.productUrl;
  }

  getProducts(options: ProductOptions): Observable<Array<Product>>{
      const {categoryId} = options;
      console.log(categoryId);
      let url = this.url+'/getProductsByCategory'; 
      
      if(categoryId)
        url = url + "?category_Id=" + categoryId;
      
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
interface ProductOptions {
  categoryId?: number;
}
interface ProductDTO{
  productId: number;
  productNo: string;
  categoryId: number;
  vendorId: number;
  brandId: number;
  modelId: number;
  description: string;
  costPrice: number;
  markup: number;
  retailPrice: number;
  quantity: number;
  image: string;
  addTax: false;
}

export class Product{
 productId: number;
 description: string;
 image: string; 
 retailPrice: number;
 costPrice:number;

 constructor(dto: ProductDTO){
    this.productId = dto.productId;
    this.image = dto.image;
    this.description = dto.description;
    this.retailPrice = dto.retailPrice;
    this.costPrice = dto.costPrice;
 }
}