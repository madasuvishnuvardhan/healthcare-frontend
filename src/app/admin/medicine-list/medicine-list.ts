import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MedicineService } from '../../services/medicine';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-medicine-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medicine-list.html',
  styleUrls: ['./medicine-list.css']
})
export class MedicineList implements OnInit {
  medicines: Medicine[] = [];

  constructor(private medicineService: MedicineService) {}

  ngOnInit(): void {
    this.loadMedicines();
  }

  loadMedicines(): void {
    this.medicineService.getAllMedicines().subscribe(data => {
      this.medicines = data;
    });
  }

  deleteMedicine(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Are you sure you want to delete this medicine?')) {
      this.medicineService.deleteMedicine(id).subscribe(() => {
        this.loadMedicines(); // Refresh the list after deletion
      });
    }
  }
}