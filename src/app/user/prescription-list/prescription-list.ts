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

  // --- ADD THIS HELPER METHOD ---
  /**
   * Safely extracts the filename from a full path, handling both
   * Windows and Unix-style separators.
   * @param fileUrl The full file path or URL.
   * @returns The extracted filename or an empty string.
   */
  getFilename(fileUrl: string | undefined): string {
    if (!fileUrl) {
      return '';
    }
    // Handles both C:\path\to\file.jpg and /path/to/file.jpg
    return fileUrl.split(/[\\/]/).pop() || '';
  }
}