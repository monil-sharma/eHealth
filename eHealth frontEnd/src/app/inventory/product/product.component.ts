import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Product } from 'src/app/Models_Admin/Product';
import { InventoryService } from 'src/app/Services_Admin/inventory.services';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(private invenServ: InventoryService, private fb: FormBuilder) {}
  id!: number;
  // price: number;
  // desc: string;
  // pname: string;
  // cat_id: number;
  flag: boolean = false;
  errorMessage: string;

  product: Product;
  updateForm: FormGroup;

  // activatedRoute: ActivatedRouteSnapshot = inject(ActivatedRouteSnapshot);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.id = data['id'];
      console.log('ID= ', this.id);
      this.invenServ.searchProduct(this.id).subscribe((data) => {
        this.product = data;
        console.log('search Product data: ', data);
        this.updateForm.patchValue(data);
        // console.log('product ', this.product);
      });
    });
    this.check();
    this.updateForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      price: [{ value: '', disabled: true }],
      stock: [{ value: '', disabled: true }],
      image: [{ value: '', disabled: true }],
      categoryId: [{ value: '', disabled: true }],
    });
    // this.updateForm.reset();
  }
  check() {
    console.log('check func', this.id);
  }

  // onClick() {
  //   this.flag = true;
  // }

  enableEditing(): void {
    // this.isEditing = true;
    Object.keys(this.updateForm.controls).forEach((control) => {
      if (control !== 'name') {
        this.updateForm.get(control)?.enable();
      }
    });
    // this.editAccountInformationForm.enable();
  }

  saveUpdate() {
    this.product.description = this.description?.value;
    this.product.price = this.price?.value;
    this.product.categoryId = this.categoryId?.value;
    this.product.stock = this.stock?.value;
    (this.product.image = this.image?.value),
      this.invenServ.updateProduct(this.product).subscribe(
        (response) => {
          console.log('Product updated', response);
          alertify.success('Product updated successfully');
          this.router.navigate(['inventory']);
        },
        (error) => {
          console.error('Prod not updated', error);
          if (error.status === 400) {
            this.errorMessage = 'Product not found';
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
    return this.updateForm.get('name');
  }
  get price() {
    return this.updateForm.get('price');
  }
  get description() {
    return this.updateForm.get('description');
  }
  get categoryId() {
    return this.updateForm.get('categoryId');
  }
  get stock() {
    return this.updateForm.get('stock');
  }
  get image() {
    return this.updateForm.get('image');
  }
}
