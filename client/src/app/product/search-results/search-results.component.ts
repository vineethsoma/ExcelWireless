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
    // if($('.isotope-grid').length > 0) {
    //   // if(imagesLoaded($('.isotope-grid'))){
    //     const grid = new Isotope('.isotope-grid');
    //     // let iso = new Isotope(grid)grid
    //     grid.arrange({
    //       // itemSelector: '.grid-item',
    //       // transitionDuration: '0.7s',
    //       // masonry: {
    //       //   columnWidth: '.grid-sizer',
    //       //   gutter: '.gutter-sizer'
    //       // }
    //       });
    //     grid.layout();
    //     console.log("Got till here ");


    //   // }
    // }
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
        // $grid.isotope({
        //   itemSelector: '.grid-item',
        //   transitionDuration: '0.7s',
        //   masonry: {
        //     columnWidth: '.grid-sizer',
        //     gutter: '.gutter-sizer'
        //   }
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

  }
}