import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import $ from "jquery/dist/jquery";
// var $:any = jQuery;
// declare var $: JQuery ;
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
    console.log($.imagesLoaded(()=>{console.log("Got here")}));
    // this.script();
  }
  
  // script() {
  //   if($('.isotope-grid').length > 0) {
  //     var $grid = $('.isotope-grid').imagesLoaded(function() {
  //       $grid.isotope({
  //         itemSelector: '.grid-item',
  //         transitionDuration: '0.7s',
  //         masonry: {
  //           columnWidth: '.grid-sizer',
  //           gutter: '.gutter-sizer'
  //         }
  //       });
  //     });
  //   }
  //     // Filtering
  //     if ($('.filter-grid').length > 0) {
  //       var $filterGrid = $('.filter-grid');
  //       $('.nav-filters').on('click', 'a', function (e) {
  //         e.preventDefault();
  //         $('.nav-filters li').removeClass('active');
  //         $(this).parent().addClass('active');
  //         var $filterValue = $(this).attr('data-filter');
  //         $filterGrid.isotope({ filter: $filterValue });
  //       });
  //     }


  //     // Shop Categories Widget
  //     //------------------------------------------------------------------------------
  //     var categoryToggle = $('.widget-categories .has-children > a');

  //     function closeCategorySubmenu() {
  //       categoryToggle.parent().removeClass('expanded');
  //     }
  //     categoryToggle.on('click', function (e) {
  //       if ($(e.target).parent().is('.expanded')) {
  //         closeCategorySubmenu();
  //       } else {
  //         closeCategorySubmenu();
  //         $(this).parent().addClass('expanded');
  //       }
  //     });

  // }
}