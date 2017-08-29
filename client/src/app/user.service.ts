import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms/forms';
import { Customer, TransactionLineItem } from "./myaccount/myaccount.component";


@Injectable()
export class UserService {

    private customerObject: Observable<Customer>;
    private transactionLineItemObject: Observable<TransactionLineItem[]>;
    constructor(private http: Http) { }

    getCustomerDetails(username: any, password: any): Observable<Customer> {
        if (!this.customerObject) {
            this.customerObject = this.http.get('http://localhost:8080/getUserLoginDetails?username=' + username + '&password=' + password)
                .map(this.extractData)
                .publishReplay(1)
                .refCount()
                .catch(this.handleError);
        }
        return this.customerObject;
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