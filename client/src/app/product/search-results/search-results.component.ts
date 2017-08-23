import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
// import $ from "jquery/dist/jquery";
// var $:any = jQuery;
// declare var $: JQuery ;
// import "masonry-layout";
import "isotope-layout";
import "tether";
import "imagesloaded";
@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements  AfterViewInit {
  isotopeGrid: any;
  gridItem: ElementRef;
  constructor(private el: ElementRef){

  }
  ngAfterViewInit(){
    this.isotopeGrid = this.el.nativeElement.querySelector('.isotope-grid');
    // console.log(imagesLoaded($('.isotope-grid')));
    this.script();
  }
  
    script() {
    if($('.isotope-grid').length) {
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