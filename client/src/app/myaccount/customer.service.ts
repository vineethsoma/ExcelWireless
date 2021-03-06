import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from './myaccount.component';
import { Transaction } from "../order/order.component";
import { environment } from "../../environments/environment";


@Injectable()
export class CustomerService {
private url: string;
constructor(private http: Http) { 
  this.url = environment.customerUrl;
}

addCustomer(customer: Customer) {
 console.log('Customer to be Added' + customer.onlyFirstName);
  this.http.post(this.url+'/addCustomer', customer)
  .subscribe(data => {
    console.log('Response From Add Customer call' + data);
  },
    error => {
  console.log(JSON.stringify(error.json()));
});
}
updateCustomer(customer: Customer) {
  console.log('Customer to be Updated' + customer.firstName);
   this.http.post(this.url+'/updateCustomer', customer)
   .subscribe(data => {
     console.log('Response After Updating Customer Details' + data);
   },
     error => {
   console.log(JSON.stringify(error.json()));
 });
 }

    getCustomerDetails(username: any, password: any): Observable<Customer> {
        return this.http.get(this.url+'/getUserLoginDetails?username=' + username + '&password=' + password)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
        return this.http.get(this.url+'/getTransactionLineItem?phoneNo=' + phoneNo)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getCustomerSalesHistory(phoneNo: number): Observable<Transaction[]> {
        return this.http.get(this.url+'/getSalesHistory?phoneNo=' + phoneNo)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getProductPriceByCustomer(phoneNo: number) {
        return this.http.get(this.url+'/getProductPriceByCustomer?phoneNo=' + phoneNo)
        .map(this.extractData)
        .catch(this.handleError);
      }

  private extractData(res: Response): Customer {
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