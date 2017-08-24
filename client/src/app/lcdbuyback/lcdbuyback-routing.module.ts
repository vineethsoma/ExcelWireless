import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LcdbuybackComponent } from './lcdbuyback.component';

const routes: Routes = [
  {path: '', component: LcdbuybackComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LcdbuybackRoutingModule { }