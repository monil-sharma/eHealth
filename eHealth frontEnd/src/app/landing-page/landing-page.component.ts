import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../Services/product.service';
import { Product } from '../Models/product';
import { LoginService } from '../Services/login.services';
import * as alertify from 'alertifyjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private loginServ: LoginService
  ) {}
  router: Router = inject(Router);
  errorMessage: string;

  admin = localStorage.getItem('userRole');

  ngOnInit(): void {
    if (this.admin == 'admin') {
      this.router.navigate(['inventory']);
    }
    this.productService.getProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
    });
  }

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
