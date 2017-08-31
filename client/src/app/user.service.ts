import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from "./myaccount/myaccount.component";
import { CheckoutOptions, OrderService } from "./order/order.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";


@Injectable()
export class UserService {
    
    private customerObject: Observable<Customer>;
    private customer: Customer; 
    private transactionLineItemObject: Observable<TransactionLineItem[]>;
    private checkoutDetails: Observable<CheckoutOptions>;
    private _isAuthenticated: BehaviorSubject<boolean>; 

    constructor(private http: Http, private orderService: OrderService) { 
        this._isAuthenticated = <BehaviorSubject<boolean>>new BehaviorSubject<boolean>(true);
    }

    getCustomerDetails(username: any, password: any): Observable<Customer> {
        if (!this.customerObject) {
            this.customerObject = this.cutomerHttpRequest(username, password)
            .map((customer) => {
                if(customer && customer.lastName)
                    this._isAuthenticated.next(true);
                return customer;
            })
            .publishReplay(1)
            .refCount()
            .share();
        }
        return this.customerObject;
    }   

    isAuthenticated(): Observable<boolean>{
        return this._isAuthenticated.asObservable();
    }

    cutomerHttpRequest(username: any, password: any): Observable<Customer>{
        return this.http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password)
        .map(this.extractData)
        .catch(this.handleError); 
    }

    getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
        if (!this.transactionLineItemObject) {
        this.transactionLineItemObject =  this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
        .map(this.extractData)
        .publishReplay(1)
        .refCount()
        .catch(this.handleError);
        }
        return this.transactionLineItemObject;
      }
      getCheckoutOptions(phoneNo: number): Observable<CheckoutOptions> {
        // if (!this.checkoutDetails) {
            this.checkoutDetails =  this.orderService.getCheckoutDetails(phoneNo)
            // publishReplay(10)
            // .refCount()
            .share()
            .catch(this.handleError);
        // }
        return this.checkoutDetails;
      }


    private extractData(res: Response): Customer {
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