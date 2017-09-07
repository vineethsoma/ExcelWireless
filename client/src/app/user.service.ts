import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Observer, BehaviorSubject } from 'rxjs/Rx';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from "./myaccount/myaccount.component";
import { Router } from "@angular/router";

@Injectable()
export class UserService {

    private customer: Customer;
    private transactionLineItemObject: Observable<TransactionLineItem[]>;
    public readonly userDetails: Observable<Customer>;
    public readonly checkoutDetails: Observable<CheckoutOptions>;
    private _isAuthenticated: BehaviorSubject<boolean>;
    private _checkoutDetails: BehaviorSubject<CheckoutOptions>;
    private _userDetails: BehaviorSubject<Customer>;
    private fetching: Observable<boolean>;
    private localStorage: ExcelData = undefined;
    constructor(private http: Http, private router: Router) {
        this._isAuthenticated = <BehaviorSubject<boolean>>new BehaviorSubject<boolean>(false);
        this._checkoutDetails = <BehaviorSubject<CheckoutOptions>>new BehaviorSubject<CheckoutOptions>({ lineItems: null, totalAmount: 0, totalQuantity: 0 });
        this._userDetails = new BehaviorSubject<Customer>(undefined);
        this.authenticateFromLocalStorage();
    }
    logout() {
        this.localStorage = null;
        localStorage.removeItem("excel-data");
        this._isAuthenticated.next(false);
        this.router.navigate(['']);
    }
    authenticateFromLocalStorage() {
        this.localStorage = JSON.parse(localStorage.getItem("excel-data"));
        console.log(this.localStorage);
        if (this.localStorage != null) {
            const user = this.localStorage.userDetails;
            this.authenticateUser(user.email, user.password);
            this.authenticateUserFromCache(user.email, user.password);
            
        }
    }
    getCustomerDetails(): Observable<Customer> {
        return this._userDetails.asObservable();
    }


    authenticateUser(username: any, password: any): void {
        this._isAuthenticated.next(false);
        this.cutomerHttpRequest(username, password).subscribe((user) => {
            this.fetching;
            this.customer = user;
            this._userDetails.next(user);
            localStorage.setItem("excel-data", JSON.stringify(<ExcelData>({ ...this.localStorage, userDetails: { ...user, email: username, password: password }, })));
            this._isAuthenticated.next(true);
        },

            (err) => {
                this._userDetails.next(undefined);
                this._isAuthenticated.next(false);
            },
            () => {
            }
        );
    }

    authenticateUserFromCache(username: any, password: any): void {
        this._isAuthenticated.next(false);
        this.fetching = Observable.create((observer: Observer<boolean>) => {
            this.cutomerHttpRequest(username, password).subscribe((user) => {
                this.fetching;
                this.customer = user;
                this._userDetails.next(user);
                localStorage.setItem("excel-data", JSON.stringify(<ExcelData>({ ...this.localStorage, userDetails: { ...user, email: username, password: password }, })));
                this._isAuthenticated.next(true);
                observer.next(true);
            },

                (err) => {
                    this._userDetails.next(undefined);
                    this._isAuthenticated.next(false);
                    observer.error(err);
                },
                () => {
                    observer.complete();
                }
            );
        }
        );

    }

    isAuthenticated(): Observable<boolean> {
        console.log("IS AUthneticated status", this._isAuthenticated);
        return this._isAuthenticated.asObservable();

    }

    isFetching(): Promise<boolean> {
        return this.fetching.last().toPromise();
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
        let { phoneNo } = this.customer;
        this.http.get('http://localhost:8080/getTransactionLineItem?phoneNo=' + phoneNo)
            .map(this.extractData)
            .map(this.updateCheckoutOptions)
            .subscribe((data) => {
                this._checkoutDetails.next(data);
            },
            (err) => {
            },
            () => {
            });
        // }
        return this.checkoutDetails;
    }
    private extractData(res: Response): any {
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
    updateCheckoutOptions(lineItems: TransactionLineItem[]) {
        return new CheckoutOptions({ lineItems: lineItems });
    }

}

interface ExcelData {
    userDetails: Customer;
}

export class CheckoutOptions {
    lineItems: TransactionLineItem[] = [];
    totalQuantity;
    totalAmount;

    constructor(options?: { lineItems: TransactionLineItem[] }) {
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
