import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavabarComponent } from './navabar/navabar.component';
import { IsotopeComponent } from './services/jquery/isotope/isotope.component';
import { ImagesloadedComponent } from './services/jquery/imagesloaded/imagesloaded.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    NavabarComponent,
    IsotopeComponent, 
    ImagesloadedComponent, FooterComponent
  ],
  exports: [HeaderComponent, NavabarComponent, FooterComponent]

})
export class SharedModule { 
  
}
