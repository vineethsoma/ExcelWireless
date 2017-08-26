import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from './myaccount.component';
import { Transaction } from "../order/order.component";


@Injectable()
export class CustomerService {

constructor(private http: Http) { }

addOrUpdateCustomer(customer: Customer) {
 console.log('Customer to be Added' + customer.onlyFirstName);
  this.http.post('http://localhost:8080/addCustomer', customer)
  .subscribe(data => {
    console.log('Response From Add Customer call' + data);
  },
    error => {
  console.log(JSON.stringify(error.json()));
});
}

    getCustomerDetails(username: any, password: any): Observable<Customer> {
        return this.http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
        return this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getCustomerSalesHistory(phoneNo: number): Observable<Transaction[]> {
        return this.http.get('http://localhost:8080/getSalesHistory?phoneNo=' + phoneNo)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getProductPriceByCustomer(phoneNo: number) {
        return this.http.get('http://localhost:8080/getProductPriceByCustomer?phoneNo=' + phoneNo)
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