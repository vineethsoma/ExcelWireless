import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { OrderService } from './order.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from "../shared/shared.module";
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AddressComponent } from "./address/address.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { PaymentComponent } from "./payment/payment.component";
import { ThankyouComponent } from "./thankyou/thankyou.component";
import { AuthGuard } from '../auth.guard';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [OrderComponent, CheckoutComponent, AddressComponent, ShippingComponent, PaymentComponent, ThankyouComponent],
  providers: [OrderService, AuthGuard]
})
export class OrderModule { }
