import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PrescriptionService } from '../../services/prescription';
import { Prescription } from '../../models/prescription.model';

@Component({
  selector: 'app-admin-prescription-list',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './prescription-list.html',
  styleUrls: ['./prescription-list.css']
})
export class AdminPrescriptionList implements OnInit {
  prescriptions: Prescription[] = [];
  isLoading = true;

  constructor(private prescriptionService: PrescriptionService) {}

  ngOnInit(): void {
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.prescriptionService.getAllPrescriptions().subscribe(data => {
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
}