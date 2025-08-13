import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderItemRequest } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  createOrder(items: OrderItemRequest[]): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, items);
  }

  getUserOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/all`);
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${orderId}/cancel`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${orderId}/status`, { status });
  }
}