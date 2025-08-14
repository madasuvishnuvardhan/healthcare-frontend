import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicine } from '../models/medicine.model';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private baseUrl = 'http://13.53.173.62:8080/api/medicines';

  constructor(private http: HttpClient) { }

  getAllMedicines(): Observable<Medicine[]> {
    return this.http.get<Medicine[]>(this.baseUrl);
  }

  getMedicineById(id: number): Observable<Medicine> {
    return this.http.get<Medicine>(`${this.baseUrl}/${id}`);
  }

  createMedicine(medicine: Medicine): Observable<Medicine> {
    return this.http.post<Medicine>(this.baseUrl, medicine);
  }

  updateMedicine(id: number, medicine: Medicine): Observable<Medicine> {
    return this.http.put<Medicine>(`${this.baseUrl}/${id}`, medicine);
  }

  deleteMedicine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}