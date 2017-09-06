import { Component, OnInit } from '@angular/core';
import { OrderService, CheckoutOptions } from "../order.service";
import { TransactionLineItem, Customer } from "../../myaccount/myaccount.component";
import { UserService } from "../../user.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  checkoutOptions: CheckoutOptions;
  sameShippingAddress = true;
  customer: Customer;

  constructor(private userService:  UserService,private orderService: OrderService) { }

  ngOnInit() {

    // if(this.userService.getCustomerDetails()) {
    //   this.userService.getCustomerDetails()
    //   .subscribe()
    // }

    //this.userService.getCustomerTransactionDetails(7707030801)

    this.getCustomerDetails();
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

  


  
  updateCheckoutOptions(lineItems: TransactionLineItem[]) {
    return new CheckoutOptions({ lineItems: lineItems });
  }

  showDifferentShippingOption() {
    this.sameShippingAddress = !this.sameShippingAddress;
  }

}
