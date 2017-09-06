import { Component, OnInit } from '@angular/core';
import { CustomerService } from "../customer.service";
import { Transaction } from "../../order/order.component";
import { UserService } from "../../user.service";
import { Customer } from "../myaccount.component";

@Component({
  selector: 'app-customer-order',
  templateUrl: './customer-order.component.html',
  styleUrls: ['./customer-order.component.scss']
})
export class CustomerOrderComponent implements OnInit {

  transactionDto: Transaction[];
  customer: Customer;

  constructor(private userService: UserService, private customerService: CustomerService) { }

  ngOnInit() {

    this.getCustomerDetails();
    this.customerService.getCustomerSalesHistory(this.customer.phoneNo)
    .subscribe((transaction: Transaction[]) => {
      this.transactionDto = transaction;
      console.log('Transaction Details for customer order', this.transactionDto);
    });

  }

  getCustomerDetails(){

    this.userService.isAuthenticated().subscribe((isAuth) => {
      if (isAuth) {
        this.userService.getCustomerDetails()
        .subscribe((cust) =>{
          this.customer = cust;
          console.log('Custoemr Details', this.customer);
        });
  } 
    })
}



}
