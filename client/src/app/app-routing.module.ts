import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule'},
  { path: 'products', loadChildren: 'app/product/product.module#ProductModule'},
  { path: 'lcdbuyback', loadChildren: 'app/lcdbuyback/lcdbuyback.module#LcdbuybackModule'},
  { path: 'myaccount', loadChildren: 'app/myaccount/myaccount.module#MyaccountModule'},
  { path: 'order', loadChildren: 'app/order/order.module#OrderModule'},
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
  { path: 'contactus', loadChildren: 'app/contact-us/contact-us.module#ContactUsModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
