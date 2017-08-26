import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { OrderService } from './order.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms/forms";
import { AddressComponent } from "./address/address.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { PaymentComponent } from "./payment/payment.component";

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ],
  declarations: [OrderComponent, CheckoutComponent, AddressComponent, ShippingComponent, PaymentComponent],
  providers: [OrderService]
})
export class OrderModule { }
