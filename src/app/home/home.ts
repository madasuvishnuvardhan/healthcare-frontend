import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: '<p>Loading...</p>', // A simple template, as this component will redirect immediately
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      // If logged in, go to the main medicines page
      this.router.navigate(['/medicines']);
    } else {
      // If not logged in, go to the login page
      this.router.navigate(['/login']);
    }
  }
}