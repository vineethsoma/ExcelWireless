import { Component, OnInit } from '@angular/core';
import { UserService, CheckoutOptions } from "../../user.service";

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {

  checkoutOptions: CheckoutOptions;
  

  constructor(private userService: UserService) { }

  ngOnInit() {

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

}
