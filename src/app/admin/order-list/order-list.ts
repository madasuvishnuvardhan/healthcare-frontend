import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class AdminOrderList implements OnInit {
  orders: Order[] = [];
  isLoading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.isLoading = false;
    });
  }

  onStatusChange(event: Event, orderId: number | undefined): void {
    if (orderId === undefined) return;
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    
    this.orderService.updateOrderStatus(orderId, newStatus).subscribe(() => {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus as 'PENDING' | 'SHIPPED' | 'DELIVERED';
      }
    });
  }
}