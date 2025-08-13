import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrescriptionService } from '../../services/prescription';
import { Prescription } from '../../models/prescription.model';

@Component({
  selector: 'app-prescription-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './prescription-list.html',
  styleUrls: ['./prescription-list.css']
})
export class PrescriptionList implements OnInit {
  prescriptions: Prescription[] = [];
  isLoading = true;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.prescriptionService.getUserPrescriptions().subscribe(data => {
      this.prescriptions = data;
      this.isLoading = false;
    });
  }

  getFilename(fileUrl: string | undefined): string {
    if (!fileUrl) {
      return '';
    }
    return fileUrl.split(/[\\/]/).pop() || '';
  }

  // --- NEW HELPER METHOD ---
  /**
   * Constructs a full, valid URL to the prescription image served by the backend.
   * @param fileUrl The file path from the backend.
   * @returns The full URL to the image.
   */
  getImageUrl(fileUrl: string | undefined): string {
    if (!fileUrl) {
      return '';
    }
    // Replace backslashes with forward slashes for a valid URL
    const correctedPath = fileUrl.replace(/\\/g, '/');
    return `http://localhost:8080/${correctedPath}`;
  }
}