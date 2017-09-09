import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GlobalService {
  private _appConfig: BehaviorSubject<AppConfig>;
  private appConfig: AppConfig;
  constructor() {
    this.appConfig = {showSideNav: false};
    this._appConfig = new BehaviorSubject<AppConfig>(this.appConfig);
  }

  updateAppConfig(config: AppConfig){
      this.appConfig = {...this.appConfig, ...config};
      console.log(this.appConfig);
      this._appConfig.next(this.appConfig); 
  }

  getAppConfig(){
    return this._appConfig.asObservable();
  }
}

export class AppConfig{
  showSideNav: boolean;
}
