import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component';
import { OrderService } from './order.service';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [OrderComponent, CheckoutComponent],
  providers: [OrderService]
})
export class OrderModule { }
