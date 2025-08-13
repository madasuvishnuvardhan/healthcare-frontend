import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  // Authentication routes accessible to everyone
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // --- User-facing routes (all authenticated users) ---
  {
    path: 'medicines',
    canActivate: [authGuard],
    loadComponent: () => import('./user/medicine-view/medicine-view').then(m => m.MedicineView)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () => import('./user/order-list/order-list').then(m => m.OrderList)
  },
  {
    path: 'prescriptions',
    canActivate: [authGuard],
    loadComponent: () => import('./user/prescription-list/prescription-list').then(m => m.PrescriptionList)
  },
  {
    path: 'prescriptions/upload',
    canActivate: [authGuard],
    loadComponent: () => import('./user/prescription-upload/prescription-upload').then(m => m.PrescriptionUpload)
  },

  // --- Admin-only routes ---
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard], // Both guards are applied
    children: [
      { path: '', redirectTo: 'medicines', pathMatch: 'full' },
      {
        path: 'medicines',
        loadComponent: () => import('./admin/medicine-list/medicine-list').then(m => m.MedicineList)
      },
      {
        path: 'medicines/new',
        loadComponent: () => import('./admin/medicine-form/medicine-form').then(m => m.MedicineForm)
      },
      {
        path: 'medicines/edit/:id',
        loadComponent: () => import('./admin/medicine-form/medicine-form').then(m => m.MedicineForm)
      },
      {
        path: 'patients',
        loadComponent: () => import('./admin/patient-list/patient-list').then(m => m.PatientList)
      },
      {
        path: 'patients/new',
        loadComponent: () => import('./admin/patient-form/patient-form').then(m => m.PatientForm)
      },
       {
        path: 'patients/edit/:id',
        loadComponent: () => import('./admin/patient-form/patient-form').then(m => m.PatientForm)
      }
    ]
  },

  // --- Redirects and Fallback ---
  // If the path is empty, redirect to the main user medicine view
  { path: '', redirectTo: '/medicines', pathMatch: 'full' },
  // If the URL doesn't match any of the above, redirect to the main view
  { path: '**', redirectTo: '/medicines' }
];