import { Component, OnInit, Input } from '@angular/core';
import { Brand, Model } from "../../product/services/product.service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../user.service";
import { CheckoutOptions } from "../../order/order.service";
import { Router } from "@angular/router";

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
  constructor(userService: UserService, private router: Router) { 
    this.userService = userService;
    this.userService.isAuthenticated()
    .subscribe((isAuthenticated) => {
      this.config.isAuthenticated = isAuthenticated;
      if(isAuthenticated)
        this.checkoutDetails = this.userService.getCheckoutOptions(7707030801);
    })
  }

  ngOnInit() {
    this.brands.subscribe((list)=>console.log(list));
  }

  navigateToModel(model: Model){
    this.router.navigate(['/products/search', {modelId: model.modelId}])
  }

  selectBrand(brand: Brand){
    this.selectedBrand = brand;
  }

  logout()
  {
    alert("user logged out !!")
  }
}
