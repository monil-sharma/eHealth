import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Services/login.services';
import { User, UserResponse } from '../Models/User';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private loginServ: LoginService) {}

  router: Router = inject(Router);
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.loginServ.getUsers().subscribe((data) => (this.users = data));
  }
  users: User[] = [];
  errorMessage: string;
  user: string;

  onSub() {
    // console.log(this.users);
    console.log(this.email?.value, this.pass?.value);

    this.loginServ.login(this.email?.value, this.pass?.value).subscribe(
      (response) => {
        console.log('Login success:', response);
        alertify.success('Logged in successfully!');

        //localStorage.setItem('userRole', response);

        this.user = localStorage.getItem('userRole') as string;
        if (this.user == 'admin') this.router.navigate(['inventory']);
        else {
          this.router.navigate(['home']);
        }
      },
      (error) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          alertify.error('Invalid username or Password');
          this.errorMessage = 'Invalid username or Pass';
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  get email() {
    return this.loginForm.get('email');
  }
  get pass() {
    return this.loginForm.get('password');
  }
}
