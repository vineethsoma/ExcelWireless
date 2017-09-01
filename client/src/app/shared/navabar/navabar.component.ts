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
    isAuthenticated: false,
    showBrandMenu: false,
    showModelMenu: false
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
    this.config.showBrandMenu = false;
    this.config.showModelMenu = false;
    this.router.navigate(['/products/search', {modelId: model.modelId}])
  }

  selectBrand(brand: Brand){
    this.selectedBrand = brand;
    this.config.showModelMenu = !this.config.showModelMenu;
    console.log(this.config);
  }

  logout()
  {
    alert("user logged out !!")
  }

  toggleBrand(){
    this.config.showBrandMenu = !this.config.showBrandMenu;
  }
}
