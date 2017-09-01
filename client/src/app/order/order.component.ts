import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { TransactionLineItem } from '../myaccount/myaccount.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  transactionLineItemDto: TransactionLineItem[];
  transactionDto: Transaction;
  newTransactionId: number;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  // This method is responsible to place final order.
  placeFinalOrder() {
    this.addTransactionDetails();
    this.addTransactionLineItemDetails();
  }
 // This is when customer place final order
  addTransactionDetails() {

    const phoneNo = 7707030801;

    // First getting transaction line item detail for customer and then form the TRANSACTION DTO TO SEND
    this.orderService.getCustomerTransactionDetails(phoneNo)
    .subscribe((transactionLineItem: TransactionLineItem[]) => {
      this.transactionLineItemDto = transactionLineItem;
      console.log('Transaction Line Item Details', this.transactionLineItemDto);
    });

    // Now i need to get last Transaction comp Id which is primary key in table and ADD BY 1.

    this.orderService.getLastTransactionId()
    .subscribe((lastTransactionId: any) => {
      this.newTransactionId = lastTransactionId;
      console.log('Transaction Line Item Details', this.transactionLineItemDto);
    });

    // tslint:disable-next-line:curly
    this.transactionDto.totalQuantity = 0;
    this.transactionDto.totalAmount = 0;

    for (let i = 0; i < this.transactionLineItemDto.length; i++) {
      this.transactionDto.totalQuantity = + this.transactionDto.totalQuantity + this.transactionLineItemDto[i].quantity ;
      // tslint:disable-next-line:max-line-length
      this.transactionDto.totalAmount = + this.transactionDto.totalAmount + (this.transactionLineItemDto[i].quantity * this.transactionLineItemDto[i].retailPrice);
      }

      this.transactionDto.subTotal = this.transactionDto.totalAmount;
      this.transactionDto.transactionDate = '';
      this.transactionDto.status = 'o';
      this.transactionDto.customerName = '';
      this.transactionDto.tax = 0.0;
      this.transactionDto.discount = 0.0;
      this.transactionDto.customerPhoneNo = 0;
      this.transactionDto.prevBalance = 0.0; // TO DO Need to handle this after talking to ASIF bhai!!
      this.transactionDto.balance = 0.0; // TO DO Need to handle this after talking to ASIF bhai!!
      this.transactionDto.receiptNote = ''; // TO DO Need to decide this, how to handle.
      this.transactionDto.transactionCompId = this.newTransactionId;

    this.orderService.addTransactionDetails(this.transactionDto);
  }

  // This is when customer place final order
  addTransactionLineItemDetails() {

    for (let i = 0; this.transactionLineItemDto.length; i ++) {

      this.transactionLineItemDto[i].transactionCompId = this.newTransactionId;
    }
    this.orderService.addTransactionLineItemDetails(this.transactionLineItemDto);
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
