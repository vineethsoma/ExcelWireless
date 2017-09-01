import { Component, OnInit } from '@angular/core';
import { OrderService, CheckoutOptions } from "../order.service";
import { TransactionLineItem } from "../../myaccount/myaccount.component";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  checkoutOptions: CheckoutOptions;
  sameShippingAddress = true;

  constructor(private orderService: OrderService, private userService:  UserService) { }

  ngOnInit() {

    this.userService.getCustomerDetails();

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

  showDifferentShippingOption() {
    this.sameShippingAddress = !this.sameShippingAddress;
  }

}
