import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineService } from '../../services/medicine';
import { Medicine } from '../../models/medicine.model';

@Component({
  selector: 'app-medicine-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './medicine-form.html',
  styleUrls: ['./medicine-form.css']
})
export class MedicineForm implements OnInit {
  medicineForm: FormGroup;
  isEditMode = false;
  medicineId?: number;

  constructor(
    private fb: FormBuilder,
    private medicineService: MedicineService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.medicineForm = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      symptoms: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Check if an 'id' is present in the URL
    this.medicineId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.medicineId) {
      this.isEditMode = true;
      // If it is, fetch the medicine data and populate the form
      this.medicineService.getMedicineById(this.medicineId).subscribe(data => {
        this.medicineForm.patchValue(data);
      });
    }
  }

  onSubmit(): void {
    if (this.medicineForm.invalid) {
      return;
    }

    const medicineData: Medicine = this.medicineForm.value;

    if (this.isEditMode && this.medicineId) {
      // If in edit mode, call the update service method
      this.medicineService.updateMedicine(this.medicineId, medicineData).subscribe(() => {
        this.router.navigate(['/admin/medicines']);
      });
    } else {
      // Otherwise, call the create service method
      this.medicineService.createMedicine(medicineData).subscribe(() => {
        this.router.navigate(['/admin/medicines']);
      });
    }
  }
}