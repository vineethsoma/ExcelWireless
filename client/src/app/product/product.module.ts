import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { ProductService } from './services/product.service';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [SearchResultsComponent, SearchWidgetComponent],
  providers: [ProductService]
})
export class ProductModule { }
