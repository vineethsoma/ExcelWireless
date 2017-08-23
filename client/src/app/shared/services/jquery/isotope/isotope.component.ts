import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import "isotope-layout";
@Component({
  selector: 'isotope',
  template: `
    <ng-content></ng-content>
  `,
  styles: []
})
export class IsotopeComponent implements AfterViewInit {
  isotopeElement: any; 
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.isotopeElement = $(this.el.nativeElement);
    
  }
  isotope(obj: any){
    return this.isotopeElement.isotope(obj);
  }

}
