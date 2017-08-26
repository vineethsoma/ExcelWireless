import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../customer.service";
import { Transaction } from "../../order/order.component";

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {

  transactionDto: Transaction[];

  constructor(private customerService: CustomerService) { }

  ngOnInit() {

    this.customerService.getCustomerSalesHistory(7707030801)
    .subscribe((transaction: Transaction[]) => {
      this.transactionDto = transaction;
      console.log('Transaction Details for customer order', this.transactionDto);
    });

  }



}
