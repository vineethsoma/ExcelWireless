import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { TransactionLineItem, Customer } from '../myaccount/myaccount.component';
import { UserService, CheckoutOptions } from "../user.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  //transactionLineItemDto: TransactionLineItem[] = [];
  transactionDto: Transaction = new Transaction();
  newTransactionId: number = 0;
  checkoutOptions: CheckoutOptions
  customer: Customer;
  totalQuantity: number = 0;
  totalAmount: any = 0;

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {

    this.getCheckoutDetails();
    this.getCustomerDetails();

    // Now i need to get last Transaction comp Id which is primary key in table,
    // doing here becuase its taking time addTransaction call is failing cause this value is primary key in table.
    this.orderService.getLastTransactionId()
    .subscribe((lastTransactionId: any) => {
      this.newTransactionId = lastTransactionId;
      console.log('Transaction Comp Id', this.newTransactionId);
    });
  }

// This method is to show Line Item Details on the page.
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
        } })
      }

  getCustomerDetails() {
    this.userService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
      this.userService.getCustomerDetails()
      .subscribe((cust) =>{
      this.customer = cust;
      console.log('Custoemr Details', this.customer);
      });
      } })
  }

  // This method is responsible to place final order.
  placeFinalOrder() {
    this.addTransactionDetails();
    this.addTransactionLineItemDetails();

    this.deleteTransactionLineItemDetails();
  }
 // This is when customer place final order and this will add data into real transaction table.
  addTransactionDetails() {

   for (let i = 0; i < this.checkoutOptions.lineItems.length; i++) {

      this.totalQuantity = + this.totalQuantity + this.checkoutOptions.lineItems[i].quantity;
      this.totalAmount = + this.totalAmount + (this.checkoutOptions.lineItems[i].quantity * this.checkoutOptions.lineItems[i].retailPrice);
     }
     
     // Here i am forming the transaction object.
      this.transactionDto.transactionCompId = this.newTransactionId;
      this.transactionDto.tax = 0.0;
      this.transactionDto.totalAmount = this.totalAmount + this.transactionDto.tax;
      this.transactionDto.subTotal = this.totalAmount;
      this.transactionDto.totalQuantity = this.totalQuantity;
      this.transactionDto.transactionDate = null;
      this.transactionDto.status = 'o';
      this.transactionDto.customerName = this.customer.firstName +' '+ this.customer.lastName;
      this.transactionDto.discount = 0.0;
      this.transactionDto.customerPhoneNo = this.customer.phoneNo;
      this.transactionDto.prevBalance = 0.0; // TO DO Need to handle this after talking to ASIF bhai!!
      this.transactionDto.balance = 0.0; // TO DO Need to handle this after talking to ASIF bhai!!
      this.transactionDto.receiptNote = ''; // TO DO Need to decide this, how to handle.
     
      // This is the service call to add transaction.
      this.orderService.addTransactionDetails(this.transactionDto);
  }
  // This is when customer place final order and this will add line item detials into table.
  addTransactionLineItemDetails() {

    console.log('InSide Line Item Details id', this.checkoutOptions.lineItems[0].transactionCompId = 1);
    for (let i = 0; i < this.checkoutOptions.lineItems.length; i ++) {

      // Adding transaction Comp Id, because it is forign key to this table.
      this.checkoutOptions.lineItems[i].transactionCompId = this.newTransactionId;
   }

    this.orderService.addTransactionLineItemDetails(this.checkoutOptions.lineItems);
  }


    // This needs to be done when customer place the final order cause i am storing unconfirmed transaction details into temp table so now after final order this details need to be deleted.
  deleteTransactionLineItemDetails() {
    this.orderService.deleteTransactionLineItemDetails();
    this.userService.refreshCheckoutDetails();
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
