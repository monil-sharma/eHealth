import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventoryService } from '../Services_Admin/inventory.services';
import { Product } from '../Models_Admin/Product';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.services';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit, DoCheck, OnChanges {
  constructor(
    private fb: FormBuilder,
    private invenServ: InventoryService,
    private loginServ: LoginService
  ) {}
  router: Router = inject(Router);

  inventoryForm: FormGroup;
  errorMessage: string;
  del: number;
  categoryName: string[] = ['Medicine', 'Supplement', 'Juice', 'Other'];

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      categoryId: [''],
      stock: [''],
      image: [''],
    });
    console.log('oninit');

    this.invenServ.getProducts().subscribe((data) => {
      this.products = data;
      console.log(data);
    });
  }

  ngDoCheck(): void {
    // this.invenServ.getProducts().subscribe((data) => (this.products = data));
    // console.log('docheck');
  }
  ngOnChanges(): void {
    // this.invenServ.getProducts().subscribe((data) => (this.products = data));
    // console.log('onchanges');
  }

  prod: Product;
  products: Product[] = [];
  onAdd() {
    let categoryId: number = this.category?.value;
    console.log(this.category?.value, ' ', categoryId);
    this.prod = new Product(
      0,
      this.name?.value,
      this.description?.value,
      this.price?.value,
      categoryId,
      this.image?.value,
      this.stock?.value
    );

    this.invenServ.addProduct(this.prod).subscribe(
      (response) => {
        console.log('Add product success:', response);
        // this.router.navigate(['login']);
        this.invenServ
          .getProducts()
          .subscribe((data1) => (this.products = data1));

        this.inventoryForm.reset();
        alertify.success('Product added succesfully');
      },
      (error) => {
        console.error('Prod not added', error);
        if (error.status === 400) {
          this.errorMessage = 'Product exists';
        } else if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'An unexpected error occurred. Please try again later.';
        }
      }
    );
  }

  onDel(id: number) {
    let flag: boolean = confirm('Do you want to delete product?');
    if (flag) {
      this.invenServ.deleteProduct(id).subscribe(
        (response) => {
          console.log('Product deleted:', response);
          // this.router.navigate(['login']);
          this.invenServ
            .getProducts()
            .subscribe((data1) => (this.products = data1));
          alertify.success('Product deleted successfully');
        },
        (error) => {
          console.error('Prod not deleted', error);
          if (error.status === 400) {
            this.errorMessage = 'Product does not exists';
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

  get name() {
    return this.inventoryForm.get('name');
  }
  get price() {
    return this.inventoryForm.get('price');
  }
  get description() {
    return this.inventoryForm.get('description');
  }
  get category() {
    return this.inventoryForm.get('categoryId');
  }
  get stock() {
    return this.inventoryForm.get('stock');
  }
  get image() {
    return this.inventoryForm.get('image');
  }
}
