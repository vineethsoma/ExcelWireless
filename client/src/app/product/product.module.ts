import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { ProductService } from './services/product.service';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  declarations: [SearchResultsComponent, SearchWidgetComponent],
  providers: [ProductService]
})
export class ProductModule { }
