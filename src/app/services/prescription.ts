import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prescription } from '../models/prescription.model';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  private baseUrl = 'http://localhost:8080/api/prescriptions';

  constructor(private http: HttpClient) { }

  getUserPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.baseUrl);
  }

  uploadPrescription(file: File): Observable<Prescription> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<Prescription>(`${this.baseUrl}/upload`, formData);
  }

  getAllPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(`${this.baseUrl}/all`);
  }
}