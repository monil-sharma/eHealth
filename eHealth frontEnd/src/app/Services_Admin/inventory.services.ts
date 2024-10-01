import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models_Admin/Product';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'http://localhost:5290/api/Inventory/';

  getProducts(): Observable<Product[]> {
    return this.http
      .get<any>(this.apiUrl + 'loadProducts')
      .pipe(map((response) => response.$values));
  }

  addProduct(prod: Product): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'saveProduct', prod, { headers });
  }

  deleteProduct(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.apiUrl + 'deleteProduct/' + id);
  }

  searchProduct(id: number): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(this.apiUrl + 'searchProduct/' + id, {
      headers,
    });
    // .pipe(map((response) => response));
  }

  updateProduct(prod: Product): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl + 'updateProduct', prod, { headers });
  }
}
