import { Component, OnInit, inject } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LoginService } from './Services/login.services';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'eHealthTotal';

  constructor(
    private loginServ: LoginService // private route: ActivatedRouteSnapshot
  ) {}
  router: Router = inject(Router);
  // route: ActivatedRoute = inject(ActivatedRoute);

  // path: string;
  // flag: boolean = true;

  // ngOnInit(): void {
  //   this.path = this.route.routeConfig?.path as string;
  //   if (this.path == 'login' || this.path == 'register') this.flag = false;
  //   console.log(this.route);
  //   console.log(this.path);
  // }

  errorMessage: string;

  logout() {
    this.loginServ.logout().subscribe(
      (response) => {
        console.log('Logout success:', response);
        alertify.error('Logged out successfully');
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Logout error:', error);
        if (error.status === 400) {
          this.errorMessage = 'Err';
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }
}
