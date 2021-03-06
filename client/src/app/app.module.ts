import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';

import { SharedModule } from './shared/shared.module';
import { ProductModule } from './product/product.module';
import { LcdbuybackModule } from './lcdbuyback/lcdbuyback.module';
import { MyaccountModule } from './myaccount/myaccount.module';
import { OrderModule } from './order/order.module';
import { AdminModule } from "./admin/admin.module";
import { ContactUsModule } from "./contact-us/contact-us.module";
import { UserService } from "./user.service";
import { ProductService } from "./product/services/product.service";
import { AuthGuard } from "./auth.guard";

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
    LcdbuybackModule,
    OrderModule,
    AdminModule,
    ContactUsModule
  ],
  providers: [UserService, ProductService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }