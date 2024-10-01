import { Component, OnInit, inject } from '@angular/core';
import * as alertify from 'alertifyjs';
import { LoginService } from '../Services/login.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
})
export class HeaderAdminComponent implements OnInit {
  constructor(private loginServ: LoginService) {}
  router: Router = inject(Router);

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
  ngOnInit(): void {}
}
