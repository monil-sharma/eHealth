import { Component, OnInit, inject } from '@angular/core';
import * as alertify from 'alertifyjs';
import { LoginService } from '../Services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private loginServ: LoginService) {}
  router: Router = inject(Router);

  errorMessage: string;

  logged = localStorage.getItem('isLoggedIn');

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
  flag: boolean = false;
  ngOnInit(): void {
    if (this.logged == 'true') {
      this.flag = true;
    }
  }
}
