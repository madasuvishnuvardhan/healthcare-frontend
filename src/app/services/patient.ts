import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private baseUrl = 'http://13.53.173.62:8080/api/patients';

  constructor(private http: HttpClient) { }

  /**
   * Fetches all patients from the backend.
   */
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  /**
   * Fetches a single patient by their ID.
   * @param id The ID of the patient to retrieve.
   */
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  /**
   * Creates a new patient record.
   * @param patient The patient data to create.
   */
  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, patient);
  }

  /**
   * Updates an existing patient record.
   * @param id The ID of the patient to update.
   * @param patient The updated patient data.
   */
  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, patient);
  }

  /**
   * Deletes a patient record by their ID.
   * @param id The ID of the patient to delete.
   */
  deletePatient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}