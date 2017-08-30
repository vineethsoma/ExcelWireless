import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Brand, ProductService } from "./product/services/product.service";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  brands: Observable<Array<Brand>> = null; 
  constructor(productService: ProductService){
    this.brands = productService.getBrands();
  }
  ngOnInit(){
    console.log(environment);
  }
}
