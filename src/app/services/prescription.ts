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

  /**
   * Fetches the prescriptions for the currently logged-in user.
   */
  getUserPrescriptions(): Observable<Prescription[]> {
    return this.http.get<Prescription[]>(this.baseUrl);
  }

  /**
   * Uploads a new prescription file.
   * @param file The prescription file (image or PDF) to be uploaded.
   */
  uploadPrescription(file: File): Observable<Prescription> {
    const formData = new FormData();
    formData.append('file', file);

    // The backend expects a multipart/form-data request for file uploads
    return this.http.post<Prescription>(`${this.baseUrl}/upload`, formData);
  }
}