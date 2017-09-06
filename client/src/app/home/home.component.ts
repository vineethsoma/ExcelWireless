import { Component, OnInit } from '@angular/core';
import { Model } from "../product/services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToModel(model: Model){
    this.router.navigate(['/products/search', {modelId: model.modelId}])
  }

  navigateToModelFromHomePage(model: Model){
    this.router.navigate(['/products/search', {modelId: model}])
  }
}