import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Brand, Model, ProductService, Category } from "../../product/services/product.service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../user.service";
import { CheckoutOptions } from "../../order/order.service";
import { Router } from "@angular/router";
import { Customer } from "../../myaccount/myaccount.component";
import { FormControl } from "@angular/forms";
import { GlobalService } from '../services/global.service';


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
    showCategoryMenu: false,
    showSearch: false,
    showSideNav: true,
    showSideSubMenu: false
  }
  //search = new FormControl();
  search: string;
  sideNavConfig: SideNavConfig = new SideNavConfig();
  
  constructor(private globalService: GlobalService, private userService: UserService, private router: Router,private productService: ProductService, private el: ElementRef) {
    this.globalService.getAppConfig().subscribe((config) => {
      this.config.showSideNav = config.showSideNav;
    });
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
    let search = this.search;
    console.log('event', search);
    this.router.navigate(['/products/search', {description:search}]);
    this.search = null;
    this.toggleSearch();

    
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

  toggleSearch(){
    this.config.showSearch = !this.config.showSearch ;
  }

  toggleSideMenu(){
    this.config.showSideNav = !this.config.showSideNav;
    this.globalService.updateAppConfig({showSideNav: this.config.showSideNav});
    console.log(this.config.showSideNav);
  }

  showSubMenuById(id: string,brand?: Brand){
    // let element = this.el.nativeElement.querySelector('#category'); 
    this.config.showSideSubMenu = true;
    if(brand)
      this.selectedBrand = brand; 
    else
      this.selectedBrand = null; 
    this.sideNavConfig.setActiveSubMenu(id);
    console.log(this.sideNavConfig);
  }
}

class SideNavConfig{
  menu={'off-view':false};
  category={'in-view': false};
  brands={'in-view': false};
  models={'in-view': false};
  
  setActiveSubMenu(id: string){  
    if(id == 'category')
      this.category['in-view']=true;
    else
      this.category['in-view']=false;
    
    if(id == 'brands')
      this.brands['in-view']=true;
    else
      this.brands['in-view']=false;
    
    if(id == 'models')
      this.models['in-view']=true;
    else
      this.models['in-view']=false;
    
    if(id == 'menu')
      this.menu['off-view']=false;
    else
      this.menu['off-view']=true;
    
  }
}
