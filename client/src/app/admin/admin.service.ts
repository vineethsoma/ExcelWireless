import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Transaction } from "../order/order.component";
import { Product } from "../product/services/product.service";


@Injectable()
export class AdminService {

constructor(private http: Http) { }

addImage(productId: number, image: any) {
 console.log('Customer to be Added' + image);
  this.http.post('http://localhost:8080/insertProductImage?product_Id=' + productId, image)
  .subscribe(data => {
    console.log('Response From Add Customer call' + data);
  },
    error => {
  console.log(JSON.stringify(error.json()));
});
    }
      getProduct(): Observable<Product[]> {
        return this.http.get('http://localhost:8080/getProduct')
        .map(this.extractData)
        .catch(this.handleError);
      }

      private extractData(res: Response): Product {
        const body = res.json();
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
