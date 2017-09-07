import { Component, OnInit, Input } from '@angular/core';
import { Brand, Model, ProductService, Category } from "../../product/services/product.service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../user.service";
import { CheckoutOptions } from "../../order/order.service";
import { Router } from "@angular/router";
import { Customer } from "../../myaccount/myaccount.component";
import { FormControl } from "@angular/forms";


@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent implements OnInit {
  @Input() brands: Observable<Array<Brand>>;
  categories: Observable<Array<Category>>;
  selectedBrand: Brand = null;
  checkoutDetails: Observable<CheckoutOptions> = null;
  userDetails: Observable<Customer>;
  config = {
    isAuthenticated: false,
    showBrandMenu: false,
    showModelMenu: false,
    showCategoryMenu: false
  }
  //search = new FormControl();
  search: string;
  
  constructor(private userService: UserService, private router: Router,private productService: ProductService) {

    this.userDetails = userService.getCustomerDetails();
    
    this.userService.isAuthenticated()
    .subscribe((isAuthenticated) => {
      this.config.isAuthenticated = isAuthenticated;
      if(isAuthenticated)
        this.checkoutDetails = this.userService.getCheckoutOptions();
    })


    this.categories = this.productService.getCategories();
  }


  ngOnInit() {
    this.brands.subscribe((list)=>console.log(list));
    //this.subscribeToSearchChanges();
  }

  // subscribeToSearchChanges(){
  //   this.search.valueChanges
  //   // .do(()=>{
  
  //   // })
  //   .debounceTime(800)
  //   .distinctUntilChanged()
  //   .subscribe(
  //     (search: string) => {
  //       if(search.length > 2) {
  //         // this.productService.getProducts({description:search});
  //         // this.productService.getProducts({description:search});
  //         this.router.navigate(['/products/search', {description:search}]);
  //       }
  //     }
  //   )
  // }

  navigateToSearch() {

    console.log('event', event);
    this.router.navigate(['/products/search', {description:this.search}]);
    this.search = null;

    
  }
  navigateToModel(model: Model){
    this.config.showBrandMenu = false;
    this.config.showModelMenu = false;
    this.config.showCategoryMenu = false;
    this.router.navigate(['/products/search', {modelId: model.modelId}])
  }

  navigateToCategory(category: Category){
    this.config.showCategoryMenu = false;
    this.router.navigate(['/products/search', {categoryId: category.categoryId}])  
  }

  closeMenu()
  {
    this.config.showBrandMenu = false;
    this.config.showModelMenu = false;
    this.config.showCategoryMenu = false;
  }

  navigateToParts(){
    this.router.navigate(['/products/search', {categoryId: 6}])  
  }

  selectBrand(brand: Brand){
    let count = 0 ; 
    this.selectedBrand = brand;
    if(count == 0 )
      this.config.showModelMenu = !this.config.showModelMenu;
    console.log(this.config);
    count++; 
  }

  logout()
  {
    // alert("user logged out !!")
    
    this.userService.logout();
  }

  toggleBrand(){
    this.config.showBrandMenu = !this.config.showBrandMenu;
  }
}
