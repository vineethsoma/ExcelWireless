import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  addTransactionDetails() {
    this.orderService.addTransactionDetails(null);
  }

  addTransactionLineItemDetails() {
    this.orderService.addTransactionLineItemDetails(null);
  }
    // tslint:disable-next-line:max-line-length
    // This needs to be done when customer place the final order cause i am storing unconfirmed transaction details into temp table so now after final order this details need to be deleted.
  deleteTransactionLineItemDetails() {

    this.orderService.deleteTransactionLineItemDetails(null);

  }


}

export class Transaction {


  transactionCompId: number;
  transactionDate: any;
  transactionTime: any;
  totalAmount: any;
  tax: any;
  discount: any;
  subTotal: any;
  customerPhoneNo: number;
  customerName: any;
  userId: number;
  status: string;
  paidAmountCash: any;
  changeAmount: any;
  paidAmountCredit: any;
  paidAmountCheck: any;
  paidAmountDebit: any;
  username: any;
  totalQuantity: number;
  transCreditId: number;
  last4Digits: number;
  prevBalance: any;
  balance: any;
  lineItemDiscount: any;
  receiptNote: any;
}
