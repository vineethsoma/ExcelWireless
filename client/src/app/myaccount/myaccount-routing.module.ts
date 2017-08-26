import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyaccountComponent } from './myaccount.component';
import { CustomerprofileComponent } from "./customerprofile/customerprofile.component";
import { CustomerOrderComponent } from "./customer-order/customer-order.component";

const routes: Routes = [
  {path: '', component: MyaccountComponent},
  {path: 'myprofile', component: CustomerprofileComponent},
  {path: 'myorder', component: CustomerOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyaccountRoutingModule { }
