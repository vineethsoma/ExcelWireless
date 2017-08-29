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
  selectedItemToDelete: TransactionLineItem;

  constructor(private orderService: OrderService) { }

  ngOnChange(){
    this.getTotal(this.transactionLineItemDto);
  }

  ngOnInit() {
    this.getCheckoutDetails();
      console.log('totalQuanity for get checkout', this.totalQuantity);
      console.log('totalQuanity for total', this.totalQuantity);
  }

  getCheckoutDetails() {
    this.orderService.getCustomerTransactionDetails(7707030801)
    .subscribe((transactionLineItem: TransactionLineItem[]) => {
      this.transactionLineItemDto = transactionLineItem;
      console.log('Transaction Line Item Details', this.transactionLineItemDto);
    });
  }

  getTotal(transactionLineItemTest: TransactionLineItem[]) {
    this.totalAmount = 0;
    this.totalQuantity = 0;
    this.transactionLineItemDto.forEach((item) => {
      this.totalAmount = this.totalAmount + item.quantity;
      this.totalQuantity = this.totalQuantity + (item.quantity * item.retailPrice);
    });
  }

  updateProductFromCart(lineItem: TransactionLineItem) {
    const phoneNo = 7707030801;
    const productNo = '8809998255262';
    // const quantity = 5;
    this.orderService.updateProductFromCart(phoneNo, lineItem.productNo, lineItem.quantity);
  }

  getLineItem(lineItem: TransactionLineItem) {
    this.selectedItemToDelete = lineItem;
  }

  deleteProductFromCart() {
    const phoneNo = 7707030801;
    const productNo = '88060852585559';

    this.orderService.deleteProductFromCart(phoneNo, this.selectedItemToDelete.productNo);
    // TO DO need to fix this its not happing.
    // After deleting line item loading new line iten object.
    this.getCheckoutDetails();
  }





}
