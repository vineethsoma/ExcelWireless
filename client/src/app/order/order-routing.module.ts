import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddressComponent } from "./address/address.component";
import { ShippingComponent } from "./shipping/shipping.component";
import { PaymentComponent } from "./payment/payment.component";
import { ThankyouComponent } from "./thankyou/thankyou.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {path: '', component: OrderComponent },
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'address', component: AddressComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'thankyou', component: ThankyouComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }