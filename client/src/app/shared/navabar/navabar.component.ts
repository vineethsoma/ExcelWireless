import { Component, OnInit, Input } from '@angular/core';
import { Brand } from "../../product/services/product.service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../user.service";
import { CheckoutOptions } from "../../order/order.service";

@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent implements OnInit {
  @Input() brands: Observable<Array<Brand>>;
  selectedBrand: Brand = null;
  checkoutDetails: Observable<CheckoutOptions> = null;
  userService: UserService;
  config = {
    isAuthenticated: false
  }
  constructor(userService: UserService) { 
    this.userService = userService;
    this.userService.isAuthenticated()
    .subscribe((isAuthenticated) => {
      this.config.isAuthenticated = isAuthenticated;
      if(isAuthenticated)
        this.checkoutDetails = this.userService.getCheckoutOptions(7707030801);
    })
  }

  ngOnInit() {
  }

  selectBrand(brand: Brand){
    this.selectedBrand = brand;
  }

  logout()
  {
    alert("user logged out !!")
  }
}
