import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminService } from "./admin.service";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminGuard } from '../admin.guard';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ],
  declarations: [AdminComponent],
  providers: [AdminService, AdminGuard]
})
export class AdminModule { }
