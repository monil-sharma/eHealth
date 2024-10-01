import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  ActivatedRoute,
} from '@angular/router';
import { LoginService } from './login.services';
import { Observable } from 'rxjs';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    console.log('canActivate', route.routeConfig?.path);

    if (!this.loginService._isLoggedIn) {
      console.log('Not allowed');
      alertify.error('You are not allowed, please login first');
      this.router.navigate(['login']);
      return false;
    }

    const userRole: string = localStorage.getItem('userRole') as string;
    const path = route.routeConfig?.path;
    console.log('User:', userRole, 'Path:', path);
    if (userRole !== 'admin' && path == 'inventory') {
      alertify.error('You are not admin, please login as admin first');
      this.router.navigate(['home']);
      return false;
    }
    // if (userRole == 'admin') {
    //   this.router.navigate(['inventory']);
    // }

    return true;
  }
}
