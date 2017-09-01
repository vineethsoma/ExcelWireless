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
  
  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private userService: UserService) { }

  // ngOnChange(){
  //   this.getTotal(this.transactionLineItemDto);
  // }

  updateCheckout(options: CheckoutOptions) {

  }

  ngOnInit() {

    this.checkoutForm = this.formBuilder.group({
      'onlyFirstName': ['', Validators.required]
    });

    this.getCheckoutDetails();
  }

  getCheckoutDetails() {
    this.userService.getCheckoutOptions(7707030801)
      .subscribe((checkoutOptions) => {
        // console.log('chekcout lineitem', lineItems);
        this.checkoutOptions = checkoutOptions;
      // console.log('chekcout option', this.checkoutOptions);
      });
  }
  updateCheckoutOptions(lineItems: TransactionLineItem[]) {
    return new CheckoutOptions({ lineItems: lineItems });
  }
  updateProductFromCart(lineItem: TransactionLineItem) {
    const phoneNo = 7707030801;
    // const productNo = '8809998255262';
    // const quantity = 5;
    this.orderService.updateProductFromCart(phoneNo, lineItem.productNo, lineItem.quantity)
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

      this.orderService.deleteProductFromCart(phoneNo, this.selectedItemToDelete.productNo)
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

