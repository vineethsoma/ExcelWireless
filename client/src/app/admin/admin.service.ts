import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Transaction } from "../order/order.component";


@Injectable()
export class AdminService {

constructor(private http: Http) { }

addImage(image: any) {
 console.log('Customer to be Added' + image);
  this.http.post('http://localhost:8080/insertProductImage?product_Id=1', image)
  .subscribe(data => {
    console.log('Response From Add Customer call' + data);
  },
    error => {
  console.log(JSON.stringify(error.json()));
});
    }
}