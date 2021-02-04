import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthenticationService} from "../services/AuthenticationService";
import {AuthenticationService2} from "../services/AuthenticationService2";


@Injectable({ providedIn: 'root' })
export class AuthGuard2 implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService2
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/facade'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
