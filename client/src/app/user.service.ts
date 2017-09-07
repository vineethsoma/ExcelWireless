import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable, Observer, BehaviorSubject, Subject } from 'rxjs/Rx';
import { FormControl } from '@angular/forms/forms';
import { TransactionLineItem } from "./myaccount/myaccount.component";
import { Router } from "@angular/router";


@Injectable()
export class UserService {

    private _isAuthenticated: BehaviorSubject<boolean>;
    private _checkoutDetails: BehaviorSubject<CheckoutOptions>;
    private _userDetails: BehaviorSubject<Customer>;

    private customer: Customer;
    private fetching: Subject<boolean>;
    private transactionLineItemObject: Observable<TransactionLineItem[]>;
    private localStorage: ExcelData = undefined;

    constructor(private http: Http, private router: Router) {
        this._isAuthenticated = new BehaviorSubject<boolean>(false);
        this._checkoutDetails = new BehaviorSubject<CheckoutOptions>({ lineItems: null, totalAmount: 0, totalQuantity: 0 });
        this._userDetails = new BehaviorSubject<Customer>(undefined);
    }

    authenticateUser(username: any, password: any): void {
        this.fetching = new Subject();
        console.log("Authentication user...")
        this.reset();
        this.cutomerHttpRequest(username, password).subscribe(
            (user) => {
                this.customer = user;
                // console.log(this.customer);
                this._userDetails.next(user);
                localStorage.setItem("excel-data", JSON.stringify(<ExcelData>({ ...this.localStorage, userDetails: { ...user, email: username, password: password }, })));
                console.log("User successfully authenticated");
                this._isAuthenticated.next(true);
            },
            (err) => {
                this._userDetails.next(undefined);
                this._isAuthenticated.next(false);
            },
            () => {
                this.fetching.next(false);
                this.fetching.complete();
                this.fetching = null;
            }
        );
    }

    async authState():Promise<boolean>{
        let authState = false;
        if(this.customer){
            authState=true;
        }
        else{
            if(!this.fetching)
                authState=false;
            else
                authState = 
                    await this.fetching.asObservable()
                    .map((data) => {
                        if(this.customer)
                            return true; 
                        else 
                            return false; 
                    })
                .toPromise();
        }
        return authState;
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
        }
    }
    getCustomerDetails(): Observable<Customer> {
        return this._userDetails.asObservable();
    }
    reset() {
        this.customer = null;
        this._checkoutDetails.next(null);
        this._userDetails.next(null);
    }
    isAuthenticated(): Observable<boolean> {
        if (this.customer) {
            this._isAuthenticated.next(true);
        }
        console.log("In Authneticated status", this._isAuthenticated);
        return this._isAuthenticated.asObservable();
    }

    // isFetching(): Promise<boolean> {
    //if(this.fetching)
    // return this.fetching.toPromise();

    // }

    async isAdmin(): Promise<boolean> {
        return await this.authState()
        .then((auth) => {
            if(auth){
                if(this.customer && this.customer.userRole.toLowerCase() =="admin")
                    return true;
            }
            return false; 
        });
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
        return this._checkoutDetails.asObservable();
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

export class Customer {
    phoneNo: number;
    onlyFirstName: string;
    firstName: string;
    lastName: string;
    companyName: string;
    email: any;
    taxId: any;
    dateOfBirth: any;
    street: any;
    city: string;
    state: string;
    country: string;
    zipCode: number;
    storeCredit: any;
    password: any;
    createdDate: any;
    validUser: boolean;
    userRole: string;
}