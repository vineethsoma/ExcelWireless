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
  productsViewList: Array<Product>;
  fullproductList: Array<Product>;
  nubmerOfItemsPerPage: number; 
  constructor(private el: ElementRef, private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.nubmerOfItemsPerPage = 10; 
  }
  ngOnInit() {
    if (this.route.snapshot.paramMap.keys.length < 1)
      this.router.navigate(['/products/search', <SearchOptions>{ page: 1, categoryId: 1 }]);

    let params;
    this.route.paramMap.switchMap((_params) => {
      params = _params;
      return this.getProducts({ categoryId: +params.get("categoryId") })
    
    })
      .subscribe((productList) => {
        this.fullproductList = productList;
        // console.log("Params", params);
        // console.log("Full",this.fullproductList);
        this.productsViewList = this.loadProductsToView({ page: +params.get("page")}, this.fullproductList); 
        // console.log(this.productsViewList);
      });
    // this.route.paramMap.switchMap((params) => this.loadProductsToView({ page: +params.get("page") }, this.fullproductList));
  }
  ngAfterViewInit() {
  }

  getProducts(options: ProductOptions) {
    return this.productService.getProducts(options);
  }
  // test(){
  //   this.fullproductList.do(()=> console.log("Performing a test"));
  // }

  loadProductsToView(options: SearchOptions, fullList: Array<Product>) {
    let { page } = options;
    // console.log(options);
    return  fullList.slice((page - 1) * this.nubmerOfItemsPerPage, (page) * (this.nubmerOfItemsPerPage));
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
    return this.fullproductList.length;
  }

  getArrayOfPages() {
      let length = this.getProductsLength();
      const pages = Math.ceil(length / this.nubmerOfItemsPerPage);
      let arr = [];
      for (let i = 1; i < pages; i++) {
        arr.push(i);
      }
      return arr;
  }

  getItemsViewed() {
      let length = this.getProductsLength();
      let start = this.getSearchOptions().page - 1 * this.nubmerOfItemsPerPage;
      let end = this.getSearchOptions().page * this.nubmerOfItemsPerPage; 
      return {
        start: start >= length? start: 1,
        end: end <= length? end: length
      }
  }

  // @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.log(event);
  }
}
class SearchOptions extends ProductOptions {
  page: number = 0;
}