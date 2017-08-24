import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyaccountComponent } from '../myaccount/myaccount.component';
import { MyaccountRoutingModule } from './myaccount-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MyaccountRoutingModule
  ],
  declarations: [MyaccountComponent]
})
export class MyaccountModule { }
