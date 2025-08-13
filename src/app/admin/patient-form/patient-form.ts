import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrls: ['./patient-form.css']
})
export class PatientForm implements OnInit {
  patientForm: FormGroup;
  isEditMode = false;
  patientId?: number;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      gender: ['', Validators.required],
      diagnosis: ['', Validators.required],
      admissionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.patientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.patientId) {
      this.isEditMode = true;
      this.patientService.getPatientById(this.patientId).subscribe(data => {
        // Format date for the HTML date input
        const admissionDate = data.admissionDate ? new Date(data.admissionDate).toISOString().split('T')[0] : '';
        this.patientForm.patchValue({ ...data, admissionDate });
      });
    }
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      return;
    }
    const patientData: Patient = this.patientForm.value;
    if (this.isEditMode && this.patientId) {
      this.patientService.updatePatient(this.patientId, patientData).subscribe(() => {
        this.router.navigate(['/admin/patients']);
      });
    } else {
      this.patientService.createPatient(patientData).subscribe(() => {
        this.router.navigate(['/admin/patients']);
      });
    }
  }
}