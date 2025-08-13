import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription';

@Component({
  selector: 'app-prescription-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prescription-upload.html',
  styleUrls: ['./prescription-upload.css']
})
export class PrescriptionUpload {
  selectedFile: File | null = null;
  statusMessage: string | null = null;
  isError = false;

  constructor(private prescriptionService: PrescriptionService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(): void {
    if (!this.selectedFile) {
      this.statusMessage = 'Please select a file to upload.';
      this.isError = true;
      return;
    }

    this.prescriptionService.uploadPrescription(this.selectedFile).subscribe({
      next: () => {
        this.isError = false;
        this.statusMessage = 'Upload successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/prescriptions']), 2000);
      },
      error: (err) => {
        this.isError = true;
        this.statusMessage = 'Upload failed. Please try again.';
        console.error(err);
      }
    });
  }
}