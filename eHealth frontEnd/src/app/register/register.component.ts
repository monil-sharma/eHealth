import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { LoginService } from '../Services/login.services';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private loginServ: LoginService) {}

  signupForm: FormGroup;
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^.*(?=.{4,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!#$@%&? "]).*$'
          ),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(10)]],
      phno: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
    });
  }
  errorMessage: string;
  user: User;
  router: Router = inject(Router);
  onSub() {
    if (this.signupForm.valid) {
      this.user = new User(
        0,
        this.email?.value,
        this.name?.value,
        this.pass?.value,
        this.address?.value,
        this.phone?.value
      );

      console.log(this.user);

      this.loginServ.registerUser(this.user).subscribe(
        (response) => {
          console.log('POST success:', response);
          alertify.success('Account created successfully');
          this.router.navigate(['login']);
        },
        (error) => {
          console.error('POST error:', error);
          if (error.status === 400) {
            this.errorMessage = 'Email exists';
          } else if (error.error && error.error.message) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again later.';
          }
        }
      );
    } else {
      alertify.error('Please fill form correctly first');
    }
  }

  get name() {
    return this.signupForm.get('name');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get pass() {
    return this.signupForm.get('password');
  }
  get address() {
    return this.signupForm.get('address');
  }
  get phone() {
    return this.signupForm.get('phno');
  }
}
