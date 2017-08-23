import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import "imagesloaded";
@Component({
  selector: 'imagesloaded',
  template: `  isotope: any;  isotope: any;


    <ng-content></ng-content>
  `,
  styles: []
})
export class ImagesloadedComponent implements AfterViewInit {
  private imagesComponent; any;
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.imagesComponent = $(this.el.nativeElement);
  }
  imagesLoaded(obj: any){
    return this.imagesComponent.imagesLoaded(obj);
  }

}
