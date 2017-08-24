import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { LcdbuybackModule } from './lcdbuyback/lcdbuyback.module';
import { MyaccountModule } from './myaccount/myaccount.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    ProductModule,
    LcdbuybackModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }