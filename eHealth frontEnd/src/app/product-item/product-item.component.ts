import { Component, Input } from '@angular/core';
import { Product } from '../Models/product';
import { CartService } from '../Services/cart.service';
import { CartItem } from '../Models/CartItem';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService, private route: Router) {}

  addToCart(product: Product): void {
    const userId = localStorage.getItem('userId');
    const CustomerId: number = userId ? parseInt(userId) : 0;

    if ((localStorage.getItem('isLoggedIn') as string) == 'true') {
      const cartItem: CartItem = {
        id: 0, // here backend generates the ID
        customerId: CustomerId,
        productId: product.id,
        productName: product.name,
        productPrice: product.price,
        quantity: 1,
        stock: product.stock, //available stock
      };
      this.cartService.addToCart(cartItem).subscribe(
        () => {
          console.log('Product added to cart successfully.');
          alert('Product added to cart successfully.');
        },
        (error) => {
          console.error('Error adding to cart:', error);
          // alert('Product added to cart successfully.');
          alert(error);
        }
      );
    } else {
      alertify.error('Please login first');
      this.route.navigate(['login']);
    }
  }
}
