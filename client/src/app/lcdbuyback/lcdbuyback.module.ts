import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LcdbuybackComponent } from './lcdbuyback.component';
import { LcdbuybackRoutingModule } from './lcdbuyback-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LcdbuybackRoutingModule
  ],
  declarations: [LcdbuybackComponent]
})
export class LcdbuybackModule { }
