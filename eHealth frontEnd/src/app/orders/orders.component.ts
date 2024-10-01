import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/Order.service';
import { Order } from '../Models/order';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  isAdmin: boolean = false;
  userId = localStorage.getItem('userId');
  customerId: number = this.userId ? parseInt(this.userId) : 0;
  userRole: string = localStorage.getItem('userRole') as string;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadOrders();
  }

  checkUserRole(): void {
    this.isAdmin = this.userRole === 'admin';
  }

  loadOrders(): void {
    if (this.isAdmin) {
      this.orderService.getAllOrders().subscribe((orders) => {
        this.orders = orders;
      });
    } else {
      this.orderService.getOrdersByCustomerId(this.customerId).subscribe(
        (orders) => {
          console.log(orders);
          this.orders = orders;
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
    }
  }

  changeStatus(orderId: number, status: string): void {
    let flag: boolean = false;
    if (!this.isAdmin) {
      flag = confirm('Do you want to cancel your order?');
    }
    if (this.isAdmin) {
      flag = true;
    }
    if (flag) {
      this.orderService.updateOrderStatus(orderId, status).subscribe(
        () => {
          console.log('Order status updated successfully.');
          this.loadOrders(); // Reload orders after updating status
          alertify.success('Order status updated successfully.');
        },
        (error) => {
          console.error('Error updating order status:', error);
        }
      );
    }
  }
}
