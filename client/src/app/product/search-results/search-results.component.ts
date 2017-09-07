import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import "isotope-layout";
import "tether";
import "imagesloaded";

import { ProductService, Product, ProductOptions } from "../services/product.service";
import { Observable } from "rxjs/Rx";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from "../../user.service";
import { OrderService } from "../../order/order.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit { 
  productsViewList: Array<Product>;
  fullproductList: Array<Product>;
  searchOptions: SearchOptions; 
  route: ActivatedRoute;
  config = {isAuthenticated: false};
  isLoading = true;

  constructor(private userService: UserService,private orderService: OrderService, private el: ElementRef, private productService: ProductService, route: ActivatedRoute, private router: Router) {
    this.route = route;
  }
  ngOnInit() {

    this.userService.isAuthenticated()
    .subscribe((isAuthenticated) => {
      this.config.isAuthenticated = isAuthenticated;
    });

    this.searchOptions = this.updateOptions({page: 1, pageSize: 20});
    
    this.route.paramMap.switchMap((_params) => {
      this.searchOptions = this.updateOptions(new SearchOptions(_params));
      
    if (this.route.snapshot.paramMap.keys.length < 2)
      this.router.navigate(['/products/search', this.searchOptions]);

      return this.getProducts(this.searchOptions)
      
    })
    .subscribe((productList) => {
      this.fullproductList = productList;
        this.productsViewList = this.loadProductsToView(this.searchOptions, this.fullproductList);
        this.isLoading = false; 
      });
  }
  
  addProduct(product: Product)
  {
    //Logic to add product.
    this.orderService.addSingleProductToCart(product)
    .subscribe((data) => {
        this.userService.refreshCheckoutDetails();
    });
  }

  addAllProducts()
  {
    let productList = this.productsViewList.filter((product) => product.quantityForPurchase > 0);
    this.orderService.addAllProductToCart(productList)
    .subscribe((data) => this.userService.refreshCheckoutDetails());
  }
  getProducts(options: ProductOptions) {
    return this.productService.getProducts(options);
  }

  
  test(obj){ 
    console.log(obj);
  }
  loadProductsToView(options: SearchOptions, fullList: Array<Product>) {
    let { page } = options;
    // console.log(options);
    return  fullList.slice((page - 1) * this.searchOptions.pageSize, (page) * (this.searchOptions.pageSize));
  }
  navigateToSearch(options: SearchOptions) {
    this.router.navigate(['/products/search', options]);
  }
  nextPage(): void {
    let page = this.getSearchOptions().page;
    let options = this.updateOptions({ page: ++page });
    this.router.navigate(['/products/search', options]);
  }
  previousPage(): void {
    let page = this.getSearchOptions().page;
    let options = this.updateOptions({ page: --page });
    this.router.navigate(['/products/search', options]);
  }

  updateOptions(update: SearchOptions) {
    let options: SearchOptions; 
    if (this.route.snapshot.paramMap.keys.length < 1)
      options = new SearchOptions();
    else
      options = {page: 1, pageSize: 20 , ...(new SearchOptions(this.route.snapshot.paramMap)), ...update };
    return options;
  }
  getCeilingOfNumber(number: number) {
    return Math.ceil(number);
  }
  getSearchOptions(): SearchOptions {
    let options = new SearchOptions(this.route.snapshot.paramMap); 
    // console.log(options);
    return options;
  }

  getProductsLength() {
    return this.fullproductList.length;
  }

  getArrayOfPages() {
      const pages = this.getNumberOfPages();
      let arr = [];
      for (let i = 1; i < pages; i++) {
        arr.push(i);
      }
      return arr;
  }
  getNumberOfPages(){
    return Math.ceil(this.getProductsLength() / this.searchOptions.pageSize);
  }

  getItemsViewed() {
      let length = this.getProductsLength();
      let start = ((this.getSearchOptions().page-1)*this.searchOptions.pageSize) +1 ;
      let end = this.getSearchOptions().page * this.searchOptions.pageSize; 
      return {
        start: start,
        end: end <= length? end: length
      }
  }

  // @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.log(event);
  }
  sortProductList(options: SearchOptions){
    console.log(options);
  }
}
class SearchOptions extends ProductOptions {
  page?: number;
  pageSize?: number;
  sortOrder?: 'price-asc' | 'price-dsc' | 'description-asc' | 'description-dsc'

  constructor(params?: ParamMap){
    super();
    if(params){
      this.categoryId = +params.get("categoryId") || 1;
      this.pageSize = +params.get("pageSize") || 20;
      this.page = +params.get("page") || 1 ;
      this.sortOrder = <'price-asc' | 'price-dsc' | 'description-asc' | 'description-dsc'>params.get("sortOrder");
      this.description = params.get("description");
      this.modelId = +params.get("modelId");
    }
    else{
      this.categoryId = 1;
      this.page = 1;
      this.pageSize = 10;
    }
  } 
}