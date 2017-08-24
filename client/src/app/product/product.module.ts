import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule
  ],
  declarations: [SearchResultsComponent, SearchWidgetComponent]
})
export class ProductModule { }
