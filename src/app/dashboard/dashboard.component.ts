import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isExpanded = true;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.snackBar.open('Logged out successfully', 'Close', { duration: 3000 });
    window.location.href = '/login';
  }
}
