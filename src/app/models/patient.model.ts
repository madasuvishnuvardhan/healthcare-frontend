export interface Patient {
  id?: number;
  name?: string;
  age?: number;
  gender?: string;
  diagnosis?: string;
  admissionDate?: string; // Using string to simplify date handling
}