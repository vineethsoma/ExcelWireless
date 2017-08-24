import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import "isotope-layout";
import "tether";
import "imagesloaded";

import { ProductService, Product } from "../services/product.service";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements  OnInit, AfterViewInit {
  productsViewList: Observable<Array<Product>>;
  fullproductList: Observable<Array<Product>>;
  constructor(private el: ElementRef, private productService: ProductService){

  }
  ngOnInit(){
    this.fullproductList = this.getProducts();
    this.loadProductsToView();

  }
  ngAfterViewInit(){
  }
  
  getProducts(){
      return this.productService.getProducts({categoryId: 6});
  }

  loadProductsToView(){
    let length = 0; 
    if(this.productsViewList){
      this.productsViewList.map((list) => {
        if(list)
          length = list.length;
      })
    }
    this.productsViewList = this.fullproductList.map((list) => {
      return list.splice(length, length + 20);
    })
    
    this.productsViewList.subscribe(() => this.script());
    
  }
  
  script() {
    if($('.isotope-grid').length > 0) {
      var $grid: any = $('.isotope-grid').imagesLoaded(function() {
        $grid.isotope({
  				itemSelector: '.grid-item',
  				transitionDuration: '0.7s',
  				masonry: {
  					columnWidth: '.grid-sizer',
  					gutter: '.gutter-sizer'
  				}
        });
      });
    }
  }
}