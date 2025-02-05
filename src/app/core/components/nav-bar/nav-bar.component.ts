import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  userRole: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Initial role check
    this.updateUserRole();

    // Subscribe to authentication changes
    this.authService.isAuthenticated$.subscribe(() => {
      this.updateUserRole();
    });
  }

  private updateUserRole() {
    const role = this.authService.getUserRole();
    this.userRole = role ? role.toUpperCase() : '';
  }

  get isAdmin(): boolean {
    return this.userRole === 'ADMIN';
  }

  get isUser(): boolean {
    return this.userRole === 'USER';
  }

  get isModerator(): boolean {
    return this.userRole === 'MODERATOR';
  }

  onLogout() {
    this.authService.logout();
  }
}
