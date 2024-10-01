// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from '../Services/cart.service';
// import { OrderService } from '../Services/Order.service';
// import { CartItem } from '../Models/CartItem';
// import { Order } from '../Models/order';
// import { ProductService } from '../Services/product.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.css'],
// })
// export class CheckoutComponent implements OnInit {
//   cartItems: CartItem[] = [];
//   orders: Order[] = [];

//   constructor(
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router,
//     private prodService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.loadCartItems();
//   }

//   prodName: string;

//   loadCartItems(): void {
//     this.cartService.getCartItems().subscribe((items) => {
//       this.cartItems = items;
//       // Preparing orders based on cart items
//       this.orders = this.cartItems.map((item) => ({
//         id: 0, // Assuming the backend generates the ID
//         customerId: item.customerId,
//         productId: item.productId,
//         quantity: item.quantity,
//         date: new Date(),
//         status: 'processing', //  initial status
//         amount: item.productPrice * item.quantity, // Calculating total amount based on product price and quantity

//         // productName: this.getProd(item.productId),
//       }));
//     });
//   }

//   placeOrder(): void {
//     const userId = localStorage.getItem('userId');
//     const customerId: number = userId ? parseInt(userId) : 0;

//     this.orderService.placeOrders(this.orders).subscribe(
//       () => {
//         console.log('Orders placed successfully.');
//         alert('Orders placed successfully.');
//         this.cartService.clearCart(customerId).subscribe(() => {
//           this.router.navigate(['/']); // Navigate to home page after placing orders
//         });
//       },
//       (error) => {
//         console.error('Error placing orders:', error);
//         alert('Error placing orders.');
//       }
//     );
//   }

//   getProd(id: number) {
//     this.prodService.getProductById(id).subscribe((res) => {
//       console.log(res);

//       this.prodName = res.name;
//       console.log(this.prodName);
//       // return this.prodName;
//     });
//     console.log(this.prodName);

//     return this.prodName;
//   }
// }

// PAyment gateway

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { OrderService } from '../Services/Order.service';
import { CartItem } from '../Models/CartItem';
import { Order } from '../Models/order';
import * as alertify from 'alertifyjs';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  orders: Order[] = [];
  status: string = '';
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private prodServ: ProductService,
    private router: Router,
    private acroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCartItems();

    // this.acroute.queryParams.subscribe((params) => {
    //   this.status = params['status'] || null;
    //   console.log('Status:', this.status);
    // });

    // if (this.status == 'success') {
    //   alertify.success('Payment was successful!');
    //   this.placeOrder();
    // }
  }

  // loadCartItems(): void {
  //   // debugger;
  //   this.cartService.getCartItems().subscribe((items) => {
  //     this.cartItems = items;
  //     // Preparing orders based on cart items
  //     this.orders = this.cartItems.map((item) => ({
  //       id: 0, // Assuming the backend generates the ID
  //       customerId: item.customerId,
  //       productId: item.productId,
  //       quantity: item.quantity,
  //       date: new Date(),
  //       status: 'processing', //  initial status
  //       amount: item.productPrice * item.quantity, // Calculating total amount based on product price and quantity
  //     }));
  //     this.calculateTotalAmount();
  //   });
  // }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(
      (items) => {
        this.cartItems = items;
        // Preparing orders based on cart items
        this.cartItems.forEach((item) => {
          this.prodServ.getProductById(item.productId).subscribe(
            (product) => {
              const order: Order = {
                id: 0, // Assuming backend generates the ID
                customerId: item.customerId,
                productId: product.id,
                productName: product.name,
                categoryName: product.categoryName,
                quantity: item.quantity,
                date: new Date(),
                status: 'processing',
                amount: product.price * item.quantity,
              };
              this.orders.push(order); // Add the processed order to orders array
              this.calculateTotalAmount();
            },
            (error) => {
              console.error('Error fetching product details:', error);
              alertify.error('Error fetching product details.');
            }
          );
        });
      },
      (error) => {
        console.error('Error fetching cart items:', error);
        alertify.error('Error fetching cart items.');
      }
    );
  }

  placeOrder(): void {
    // if (this.status == 'failure' || this.status == null) {
    //   alertify.error('redirect you to payment');
    const name = localStorage.getItem('userName');
    const phone = localStorage.getItem('userPhone') as string;
    const address = localStorage.getItem('userAddress');
    const email = localStorage.getItem('_user');
    const price = this.totalAmount.toString();
    // window.location.href = `https://localhost:44307?name=${name}&phone=${phone}&address=${address}&email=${email}&price=${price}`; //redirect to razorpay module
    // } else {
    const userId = localStorage.getItem('userId');
    const customerId: number = userId ? parseInt(userId) : 0;

    this.orderService.placeOrders(this.orders).subscribe(
      () => {
        console.log('Orders placed successfully.');
        alert('Orders placed successfully.');
        this.cartService.clearCart(customerId).subscribe(() => {
          this.router.navigate(['/']); // Navigate to home page after placing orders
        });
      },
      (error) => {
        console.error('Error placing orders:', error);
        // alert('Error placing orders.');
      }
    );
  }
  // }
  calculateTotalAmount() {
    // debugger;
    this.totalAmount = this.orders.reduce(
      (total, order) => total + order.amount,
      0
    );
  }
}
