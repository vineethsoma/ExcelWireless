import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from '../myaccount/myaccount.component';
import { Transaction } from './order.component';
import { UserService } from "../user.service";


@Injectable()
export class OrderService {
  customer: Customer = null; 
  constructor(private http: Http, private userService: UserService) {
      this.userService.getCustomerDetails().subscribe((customer) => {
        this.customer = customer;
      });
   }

  updateProductFromCart(productNo: any, quantity: number) {
    // console.log('Customer to be Added' + customer.onlyFirstName);
    // tslint:disable-next-line:whitespace
    // tslint:disable-next-line:max-line-length
    return this.http.post('http://localhost:8080/updateTransactionLineItem?phoneNo=' + this.customer.phoneNo + '&productNo=' + productNo + '&quantity=' + quantity, null);
  }

  deleteProductFromCart(productNo: any) {
    // tslint:disable-next-line:whitespace
    return this.http.post('http://localhost:8080/deleteTransactionLineItem?phoneNo=' + this.customer.phoneNo + '&productNo=' + productNo, null)

  }

  // This is to get last transaction id so i can add 1 and generate new one.
  getLastTransactionId(): Observable<any> {
    return this.http.get('http://localhost:8080/getLastTransactionId')
      .map(this.extractData)
      .catch(this.handleError);
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
  deleteTransactionLineItemDetails() {
    // tslint:disable-next-line:whitespace
    this.http.post('http://localhost:8080/deleteTransactionLineItemsForFinalOrder?customerPhoneNo=' + this.customer.phoneNo, null)
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

  updateCheckoutOptions(lineItems: TransactionLineItem[]) {
    return new CheckoutOptions({ lineItems: lineItems });
  }
  getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
    return this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
   
      .map(this.extractData)
      .catch(this.handleError);
  }
  getCheckoutDetails(): Observable<CheckoutOptions>{
    return this.getCustomerTransactionDetails(this.customer.phoneNo).map(this.updateCheckoutOptions);
  }
  getCustomerCheckoutDetails(): Observable<CheckoutOptions> {
    return this.getCustomerTransactionDetails(this.customer.phoneNo)
      .map((items: TransactionLineItem[]) => new CheckoutOptions({lineItems: items}))
      .catch(this.handleError);
  }
  private extractData(res: Response): any {
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
export class CheckoutOptions {
  lineItems: TransactionLineItem[] = [];
  totalQuantity;
  totalAmount;

  constructor(options?: {lineItems: TransactionLineItem[]}) {
    if (!options) {
      this.lineItems = [];
      this.totalQuantity = 0;
      this.totalAmount = 0;
    } else {
      this.lineItems = options.lineItems;
      this.totalAmount = 0;
      this.totalQuantity = 0;
      this.lineItems.forEach((item) => {
        this.totalQuantity += item.quantity;
        this.totalAmount += item.quantity * item.retailPrice;
      });
    }
  }
}
