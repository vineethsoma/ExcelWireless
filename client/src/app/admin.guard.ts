import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from "./user.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isAdmin().then(
      (isAdmin) => {
        if (isAdmin) {
          console.log("Admin status", isAdmin);
          return true;
        }
        this.router.navigate(['/myaccount', { redirectTo: state.url }]);
        return false;
      });
  }
}