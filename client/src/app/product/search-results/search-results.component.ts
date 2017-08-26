import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import "isotope-layout";
import "tether";
import "imagesloaded";

import { ProductService, Product, ProductOptions } from "../services/product.service";
import { Observable } from "rxjs/Rx";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  // params: any ; 
  productsViewList: Observable<Array<Product>>;
  fullproductList: Observable<Array<Product>>;
  constructor(private el: ElementRef, private productService: ProductService, private route: ActivatedRoute, private router: Router) {

  }
  ngOnInit() {
    if (this.route.snapshot.paramMap.keys.length < 1)
      this.router.navigate(['/products/search', <SearchOptions>{ page: 1, categoryId: 1 }]);
    this.fullproductList = this.route.paramMap.switchMap((params) => this.getProducts({ categoryId: +params.get("categoryId") })).share().do(() => console.log("FullProductList is called"));
    this.productsViewList = this.route.paramMap.switchMap((params) => this.loadProductsToView({ page: +params.get("page") }, this.fullproductList));
  }
  ngAfterViewInit() {
  }

  getProducts(options: ProductOptions) {
    return this.productService.getProducts(options);
  }
  test(){
    this.fullproductList.do(()=> console.log("Performing a test"));
  }

  loadProductsToView(options: SearchOptions, fullList: Observable<Array<Product>>) {
    let { page } = options;
    return fullList.do(()=> console.log("Loading the view"))
    .map((list) => {
      return list.slice((page - 1) * 20, (page) * (20));
    })

  }
  navigateToSearch(options: SearchOptions) {
    this.router.navigate(['/products/search', options]);
  }
  nextPage(): void {
    let page = this.getSearchOptions().page;
    let options = this.updateOptions({ page: ++page });
    // this.productsViewList = this.loadProductsToView(options, this.fullproductList);
    this.router.navigate(['/products/search', options]);
  }

  updateOptions(update: SearchOptions) {
    let options = { ...this.route.snapshot.params, ...update };
    return options;
  }
  getCeilingOfNumber(number: number) {
    return Math.ceil(number);
  }
  getSearchOptions(): SearchOptions {
    return <SearchOptions>{ ...this.route.snapshot.params };
  }

  getProductsLength() {
    return this.fullproductList.do(() => console.log("Getting the product length")).map((list) => list.length);
  }

  getArrayOfPages() {
    return this.getProductsLength().map((length) => {
      const pages = Math.ceil(length / 20);
      let arr = [];
      for (let i = 0; i < pages; i++) {
        arr.push(i);
      }
      return arr;
    })
  }

  getItemsViewed() {
    return this.getProductsLength().map((length) => {
      let start = this.getSearchOptions().page - 1 * 20;
      let end = this.getSearchOptions().page * 20; 
      return {
        start: start >= length? start: 1,
        end: end >= length? end: length
      }
    })
  }

  // @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.log(event);
  }
}
class SearchOptions extends ProductOptions {
  page: number = 0;
}