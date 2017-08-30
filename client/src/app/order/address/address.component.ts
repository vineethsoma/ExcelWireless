import { Component, OnInit } from '@angular/core';
import { OrderService, CheckoutOptions } from "../order.service";
import { TransactionLineItem } from "../../myaccount/myaccount.component";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  checkoutOptions: CheckoutOptions;

  constructor(private orderService: OrderService) { }

  ngOnInit() {

  }
  getCheckoutDetails() {
    this.orderService.getCustomerTransactionDetails(7707030801)
      .subscribe((lineItems) => {
        console.log('chekcout lineitem', lineItems);
        this.checkoutOptions = this.updateCheckoutOptions(lineItems);
      console.log('chekcout option', this.checkoutOptions);
      });
  }
  updateCheckoutOptions(lineItems: TransactionLineItem[]) {
    return new CheckoutOptions({ lineItems: lineItems });
  }

}
