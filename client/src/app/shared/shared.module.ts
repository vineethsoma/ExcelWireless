import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavabarComponent } from './navabar/navabar.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    NavabarComponent
  ],
  exports: [HeaderComponent, NavabarComponent]
})
export class SharedModule { 
  
}
