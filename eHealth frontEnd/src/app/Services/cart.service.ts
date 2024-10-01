import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../Models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:5290/api/Cart';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    const userId = localStorage.getItem('userId');
    const customerId: number = userId ? parseInt(userId) : 0;

    return this.http.get<any>(this.apiUrl + '/' + customerId).pipe(
      map((response) => response.$values) // Transform the response to extract $values
    );
  }

  addToCart(cartItem: any): Observable<CartItem> {
    if (cartItem.quantity <= cartItem.stock) {
      return this.http.post<CartItem>(this.apiUrl, cartItem);
    } else {
      return new Observable((observer) => {
        observer.error('Insufficient stock');
        observer.complete();
      });
    }
  }

  updateCartItem(
    cartItem: CartItem,
    previousQuantity: number
  ): Observable<void> {
    if (cartItem.quantity <= cartItem.stock) {
      return this.http.put<void>(`${this.apiUrl}/${cartItem.id}`, cartItem);
    } else {
      cartItem.quantity = previousQuantity;
      return new Observable((observer) => {
        observer.error(
          'Insufficient stock. Cannot add more items than available in stock.'
        );
        observer.complete();
      });
    }
  }

  removeCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  clearCart(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear/${customerId}`);
  }
}
