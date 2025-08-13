import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import the *services* not the models directly for injection
import { MedicineService } from '../../services/medicine';
import { OrderService } from '../../services/order';
// Import the *models* for type definitions
import { Medicine } from '../../models/medicine.model';
import { OrderItemRequest } from '../../models/order.model';

@Component({
  selector: 'app-medicine-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medicine-view.html',
  styleUrls: ['./medicine-view.css']
})
export class MedicineView implements OnInit {
  medicines: Medicine[] = [];
  cart: OrderItemRequest[] = [];
  orderStatusMessage: string | null = null;
  orderStatusIsError: boolean = false;

  // Use the correct service variable names here
  constructor(
    private medicineService: MedicineService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    // Call the method on the correct service instance
    this.medicineService.getAllMedicines().subscribe({
      next: (data: Medicine[]) => {
        this.medicines = data;
      },
      error: (err: any) => {
        console.error('Failed to load medicines', err);
      }
    });
  }

  addToCart(medicine: Medicine): void {
    if (medicine.id === undefined) return;

    const existingItem = this.cart.find(item => item.medicine.id === medicine.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        medicine: { id: medicine.id },
        quantity: 1
      });
    }
    this.orderStatusMessage = `${medicine.name} added to cart.`;
    this.orderStatusIsError = false;
  }
  
  // Helper method to get the name for the cart display
  getMedicineName(medicineId: number | undefined): string {
    const medicine = this.medicines.find(m => m.id === medicineId);
    return medicine ? medicine.name ?? 'Unknown Medicine' : 'Unknown Medicine';
  }

  placeOrder(): void {
    if (this.cart.length === 0) {
      this.orderStatusMessage = 'Your cart is empty.';
      this.orderStatusIsError = true;
      return;
    }

    // Call the method on the correct service instance
    this.orderService.createOrder(this.cart).subscribe({
      next: () => {
        this.orderStatusMessage = 'Order placed successfully!';
        this.orderStatusIsError = false;
        this.cart = []; // Clear the cart
        this.loadMedicines(); // Reload medicines to get updated stock
      },
      error: (err: any) => {
        this.orderStatusMessage = err.error?.message || 'Failed to place order.';
        this.orderStatusIsError = true;
        console.error('Order failed', err);
      }
    });
  }
}