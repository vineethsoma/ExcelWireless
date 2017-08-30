import { Component, OnInit, Input } from '@angular/core';
import { Brand } from "../../product/services/product.service";
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent implements OnInit {
  @Input() brands: Observable<Array<Brand>>;
  selectedBrand: Brand = null;
  constructor() { }

  ngOnInit() {
  }

  selectBrand(brand: Brand){
    this.selectedBrand = brand;
  }
}
