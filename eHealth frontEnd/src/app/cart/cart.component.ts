import { Component, DoCheck, OnInit } from '@angular/core';
import { CartService } from '../Services/cart.service';
import { CartItem } from '../Models/CartItem';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      console.log(items)
      this.cartItems = items;
    });
  }

  removeFromCart(id: number): void {
    this.cartService.removeCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    });
  }

  updateQuantity(item: CartItem): void {
    const previousQuantity = item.quantity;
    this.cartService.updateCartItem(item, previousQuantity).subscribe(
      () => {
        console.log('Cart item updated successfully.');
      },
      error => {
        console.error('Error updating cart item:', error);
        alert(error); 
        
        item.quantity = previousQuantity;
        this.loadCartItems(); 
      }
    );
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.productPrice ?? 0) * item.quantity, 0);
  }
}
