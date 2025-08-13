import { Medicine } from './medicine.model';

// Represents an item to be sent when creating an order
export interface OrderItemRequest {
  medicine: { id: number | undefined };
  quantity: number;
}

// Represents a returned order item with full medicine details
export interface OrderItem {
  id?: number;
  medicine: Medicine;
  quantity: number;
}

export interface Order {
  id?: number;
  orderDate?: string;
  status?: 'PENDING' | 'SHIPPED' | 'DELIVERED';
  totalPrice?: number;
  orderItems?: OrderItem[];
  user?: any;
}