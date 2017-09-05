import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from "./myaccount/myaccount.component";
import { CheckoutOptions, OrderService } from "./order/order.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";


@Injectable()
export class UserService{

    private customer: Customer;
    private transactionLineItemObject: Observable<TransactionLineItem[]>;
    public readonly userDetails: Observable<Customer>;
    public readonly checkoutDetails: Observable<CheckoutOptions>;
    private _isAuthenticated: BehaviorSubject<boolean>;
    private _checkoutDetails: BehaviorSubject<CheckoutOptions>;
    private _userDetails: BehaviorSubject<Customer>;
    private fetching: boolean = false
    private localStorage: ExcelData = undefined;
    constructor(private http: Http, private orderService: OrderService, private router: Router) {
        this._isAuthenticated = <BehaviorSubject<boolean>>new BehaviorSubject<boolean>(false);
        this._checkoutDetails = <BehaviorSubject<CheckoutOptions>>new BehaviorSubject<CheckoutOptions>({ lineItems: null, totalAmount: 0, totalQuantity: 0 });
        this._userDetails = new BehaviorSubject<Customer>(undefined);
        
        this.localStorage = JSON.parse(localStorage.getItem("excel-data"));
        console.log(this.localStorage);
        if(this.localStorage != null){
            const user = this.localStorage.userDetails; 
            this.authenticateUser(user.email, user.password);
        }
    }
    logout(){
        this.localStorage = null; 
        localStorage.removeItem("excel-data");
    }
    getCustomerDetails(): Observable<Customer> {
        return this._userDetails.asObservable();
    }


    authenticateUser(username: any, password: any): void {
        this._isAuthenticated.next(false);
        this.cutomerHttpRequest(username, password).subscribe((user) => {
            this.customer = user;
            this._userDetails.next(user);
            localStorage.setItem("excel-data", JSON.stringify(<ExcelData>({...this.localStorage, userDetails: {...user, email: username, password: password}, } )));
            this._isAuthenticated.next(true);
        },
    
        (err) => {
            this._userDetails.next(undefined);
            this._isAuthenticated.next(false);
        }); 

    }

    isAuthenticated(): Observable<boolean> {
        return this._isAuthenticated.asObservable();
    }

    cutomerHttpRequest(username: any, password: any): Observable<Customer> {
        return this.http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getCustomerTransactionDetails(phoneNo: number): Observable<TransactionLineItem[]> {
        if (!this.transactionLineItemObject) {
            this.transactionLineItemObject = this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
                .map(this.extractData)
                .publishReplay(1)
                .refCount()
                .catch(this.handleError);
        }
        return this.transactionLineItemObject;
    }
    getCheckoutOptions(): Observable<CheckoutOptions> {
        this.refreshCheckoutDetails();
        return this._checkoutDetails.asObservable();
    }


    refreshCheckoutDetails(): Observable<CheckoutOptions> {
        // if (!this.checkoutDetails) {
        this.fetching = true;
        let {phoneNo} = this.customer; 
        this.orderService.getCheckoutDetails(phoneNo)
            .subscribe((data) => {
                this.fetching = false;
                this._checkoutDetails.next(data);
            },
            (err) => {
                this.fetching = false;
            },
            () => {
                this.fetching = false;
            });
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

interface ExcelData{
    userDetails: Customer; 
}