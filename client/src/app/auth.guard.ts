import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from "./user.service";
import { Observable } from "rxjs/Rx";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private userService: UserService, private router: Router) {
		this.userService.authenticateFromLocalStorage();
	}
	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
			console.log("In auth guard");
		
		
			// return this.userService.
			return true;
		
		
		
		
		
			// return Observable
			// .defer(async () => {
			// 	let status;
			// 	if (this.userService.isFetching()) {
			// 		status = await this.userService.isFetching().then((data) => data);
			// 		console.log("The status is", status);
			// 	}
			// return status;
			// })
			// .switchMap(this.userService.isAuthenticated)
			// .map((auth) => {
			// 	console.log("Got here");
			// 	console.log("This is auth", auth);
			// 	if (auth) {
			// 		console.log("Got here");
			// 		return true;
			// 	}else{
			// 		this.router.navigate(['/myaccount', { redirectTo: state.url }]);
			// 		return false;
			// 	}

			// }
			// );
	}
}
