import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { MyaccountRoutingModule } from './myaccount-routing.module';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CustomerService } from './customer.service';
import { CustomerprofileComponent } from "./customerprofile/customerprofile.component";
import { CustomerOrderComponent } from "./customer-order/customer-order.component";


@NgModule({
  imports: [
    CommonModule,
    MyaccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [MyaccountComponent, CustomerprofileComponent, CustomerOrderComponent],
  providers: [CustomerService],
})
export class MyaccountModule { }
