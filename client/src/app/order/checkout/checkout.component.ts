import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { TransactionLineItem } from '../../myaccount/myaccount.component';
import { Transaction } from '../order.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  transactionLineItemDto: TransactionLineItem[] = [];
  transactionDto: Transaction;
  totalQuantity = 0;
  totalAmount = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getCheckoutDetails();
      console.log('totalQuanity', this.totalQuantity);
      this.getTotal(this.transactionLineItemDto);
      console.log('totalQuanity', this.totalQuantity);
  }

  getCheckoutDetails() {
    this.orderService.getCustomerTransactionDetails(7707030801)
    .subscribe((transactionLineItem: TransactionLineItem[]) => {
      this.transactionLineItemDto = transactionLineItem;
      console.log('Transaction Line Item Details', this.transactionLineItemDto);
    });
  }

  getTotal(transactionLineItemTest: TransactionLineItem[]) {
    for (let i = 0; i < transactionLineItemTest.length; i ++) {
      this.totalQuantity = this.totalQuantity + this.transactionLineItemDto[i].quantity;
      this.totalAmount = this.totalAmount + (this.transactionLineItemDto[i].retailPrice * this.transactionLineItemDto[i].quantity);
      console.log('totalQuanity', this.totalQuantity);
    }
  }

  updateProductFromCart(lineItem: TransactionLineItem) {
    const phoneNo = 7707030801;
    const productNo = '8809998255262';
    // const quantity = 5;
    this.orderService.updateProductFromCart(phoneNo, lineItem.productNo, lineItem.quantity);
  }

  deleteProductFromCart(lineItem: TransactionLineItem) {
    const phoneNo = 7707030801;
    const productNo = '88060852585559';

    this.orderService.deleteProductFromCart(phoneNo, lineItem.productNo);
    // TO DO need to fix this its not happing.
    // After deleting line item loading new line iten object.
    this.getCheckoutDetails();
  }





}
