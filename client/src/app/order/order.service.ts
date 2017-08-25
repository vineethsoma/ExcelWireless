import {Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from '../myaccount/myaccount.component';
import { Transaction } from './order.component';


@Injectable()
export class OrderService {

constructor(private http: Http) { }

updateProductFromCart(phoneNo: number, productNo: any, quantity: number) {
 // console.log('Customer to be Added' + customer.onlyFirstName);
  // tslint:disable-next-line:whitespace
  this.http.post('http://localhost:8080/updateTransactionLineItem?phoneNo=' +phoneNo+ 'productNo=' +productNo+ 'quantity=' + quantity, null)
  .subscribe(data => {
    console.log('Response After updating product from cart' + data);
  },
    error => {
  console.log(JSON.stringify(error.json()));
});
}

deleteProductFromCart(phoneNo: number, productNo: any) {
    // tslint:disable-next-line:whitespace
    this.http.post('http://localhost:8080/deleteTransactionLineItem?phoneNo=' +phoneNo + 'productNo=' +productNo, null)
    .subscribe(data => {
      console.log('Response After deleting product from cart' + data);
    },
      error => {
    console.log(JSON.stringify(error.json()));
  });
  }

  // This is after clicking on place final order where we storing Transaction details into real Transaction table.
  addTransactionDetails(transactionDetails: Transaction) {
     // tslint:disable-next-line:whitespace
     this.http.post('http://localhost:8080/addTransaction', transactionDetails)
     .subscribe(data => {
       console.log('Response After adding transaction details' + data);
     },
       error => {
     console.log(JSON.stringify(error.json()));
   });
   }

   addTransactionLineItemDetails(transactionLineItemDetails: TransactionLineItem[]) {
    // tslint:disable-next-line:whitespace
    this.http.post('http://localhost:8080/checkoutTransactionLineItem', transactionLineItemDetails)
    .subscribe(data => {
      console.log('Response Addiing lineitem details' + data);
    },
      error => {
    console.log(JSON.stringify(error.json()));
  });
  }
    // tslint:disable-next-line:max-line-length
    // This needs to be done when customer place the final order cause i am storing unconfirmed transaction details into temp table so now after final order this details need to be deleted.
  deleteTransactionLineItemDetails(phoneNo: number) {
    // tslint:disable-next-line:whitespace
    this.http.post('http://localhost:8080/deleteTransactionLineItemsForFinalOrder?customerPhoneNo=' +phoneNo, null)
    .subscribe(data => {
      console.log('Response After deleting tranaction line items from temp table' + data);
    },
      error => {
    console.log(JSON.stringify(error.json()));
  });
  }

    getCustomerDetails(username: string, password: string): Observable<Customer> {
        return this.http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password)
        .map(this.extractData)
        .catch(this.handleError);
      }

      getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
        return this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
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