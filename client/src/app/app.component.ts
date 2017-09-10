import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Brand, ProductService } from "./product/services/product.service";
import { Observable } from "rxjs/Rx";
import { UserService } from "./user.service";
import { GlobalService, AppConfig } from './shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  brands: Observable<Array<Brand>> = null; 
  config: AppConfig;
  constructor(private userService: UserService, productService: ProductService, private globalSerivce: GlobalService){
    this.globalSerivce.getAppConfig().subscribe((config) => {
      this.config = config;
    });
    this.brands = productService.getBrands();
  }
  ngOnInit(){
    console.log(environment);
    this.userService.authenticateFromLocalStorage();

  }
}
