import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:5290/api/Orders';

  constructor(private http: HttpClient) { }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}/customer/${customerId}`).pipe(
      map(response => response.$values)
    );
  }
  getAllOrders(): Observable<Order[]> {
    return this.http.get<any>(`${this.apiUrl}/admin`).pipe(
      map(response => response.$values)
    );
  }

  updateOrderStatus(orderId: number, status: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${orderId}/status`, { status });
  }
 

  placeOrders(orders: Order[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/place-orders`, orders);
  }
}
