import { Component, OnInit } from '@angular/core';
import { OrderService, CheckoutOptions } from '../order.service';
import { TransactionLineItem } from '../../myaccount/myaccount.component';
import { Transaction } from '../order.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { UserService } from "../../user.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  transactionDto: Transaction;
  selectedItemToDelete: TransactionLineItem;
  checkoutOptions: CheckoutOptions;
  checkoutForm: FormGroup;

  constructor(private userService: UserService, private orderService: OrderService, private formBuilder: FormBuilder) {


  }
  updateCheckout(options: CheckoutOptions) {

  }

  ngOnInit() {

    this.checkoutForm = this.formBuilder.group({
      'onlyFirstName': ['', Validators.required]
    });
    console.log("Checkout initialized");
    this.getCheckoutDetails();
  }

  getCheckoutDetails() {

    this.userService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.userService.refreshCheckoutDetails();
        this.userService.getCheckoutOptions()
        .subscribe((checkoutOptions) => {
          // console.log('chekcout lineitem', lineItems);
            this.checkoutOptions = checkoutOptions;
            console.log('chekcout option', this.checkoutOptions);
          });
      }
    }
    )
  }

updateCheckoutOptions(lineItems: TransactionLineItem[]) {
  return new CheckoutOptions({ lineItems: lineItems });
}
updateProductFromCart(lineItem: TransactionLineItem) {
  // const productNo = '8809998255262';
  // const quantity = 5;

  this.orderService.updateProductFromCart(lineItem.productNo, lineItem.quantity)
    .subscribe(data => {
      console.log('Response After updating product from cart' + data);
      this.getCheckoutDetails();
    },
    error => {
      console.log(JSON.stringify(error.json()));
    })
    ;
  // this.checkoutOptions.lineItems.find((item) => item.productNo == lineItem.productNo)

}
deleteProductFromCart(lineItem: TransactionLineItem) {
  const phoneNo = 7707030801;
  //   const productNo = '88060852585559';

  this.orderService.deleteProductFromCart(this.selectedItemToDelete.productNo)
    .subscribe(data => {
      console.log('Response After deleting product from cart' + data);
      this.getCheckoutDetails();
    },
    error => {
      console.log(JSON.stringify(error.json()));
    });
}

getLineItem(lineItem: TransactionLineItem) {
  this.selectedItemToDelete = lineItem;
}

}

