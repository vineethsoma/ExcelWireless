import { Component, OnInit } from '@angular/core';
import { GlobalService, AppConfig } from '../services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  config: AppConfig;
  constructor(private globalService: GlobalService) { 
    this.globalService.getAppConfig()
    .subscribe((config)=>{
      this.config = config;
      console.log("From header", this.config);
    });
  }
  ngOnInit() {
  }

}
