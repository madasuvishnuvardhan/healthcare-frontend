import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './order-list.html',
  styleUrls: ['./order-list.css']
})
export class OrderList implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load your orders. Please try again later.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  cancelOrder(orderId: number | undefined): void {
    if (orderId === undefined) return;

    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(o => o.id !== orderId);
        },
        error: (err) => {
          this.errorMessage = 'Failed to cancel the order. Please try again.';
          console.error(err);
        }
      });
    }
  }
}