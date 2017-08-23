import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavabarComponent } from './navabar/navabar.component';
import { IsotopeComponent } from './services/jquery/isotope/isotope.component';
import { ImagesloadedComponent } from './services/jquery/imagesloaded/imagesloaded.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    NavabarComponent,
    IsotopeComponent, 
    ImagesloadedComponent
  ],
  exports: [HeaderComponent, NavabarComponent]

})
export class SharedModule { 
  
}
