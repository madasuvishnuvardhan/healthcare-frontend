import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar'; // Corrected import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar], // Corrected import
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'healthcare-frontend';
}