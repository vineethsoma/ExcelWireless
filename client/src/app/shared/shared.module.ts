import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavabarComponent } from './navabar/navabar.component';
import { IsotopeComponent } from './services/jquery/isotope/isotope.component';
import { ImagesloadedComponent } from './services/jquery/imagesloaded/imagesloaded.component';
import { FooterComponent } from './footer/footer.component';
import { LoadComponent } from "./load/load.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    HeaderComponent,
    NavabarComponent,
    IsotopeComponent,
    ImagesloadedComponent,
    FooterComponent,
    LoadComponent
  ],
  exports: [HeaderComponent, NavabarComponent, FooterComponent, LoadComponent]

})
export class SharedModule {
}
