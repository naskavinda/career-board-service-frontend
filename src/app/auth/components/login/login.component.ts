import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from '../../../services/notification.service';
import { formatErrorMessage } from '../../../utils/string-formatter';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
        }
      },
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.success) {
            const successMessage = 'Login successful';
            this.notificationService.showSuccess(successMessage);
            this.router.navigate(['/dashboard']);
          } else {
            const errorMessage = formatErrorMessage(
              response.message || 'LOGIN_FAILED'
            );
            // this.notificationService.showError(errorMessage);
          }
        },
        error: (error) => {
          const errorMessage =
            formatErrorMessage(error.error?.message) ||
            'Login failed. Please try again.';
          this.notificationService.showError(errorMessage);
        },
      });
    }
  }

  get isUsernameValid() {
    return this.isFieldValid('username');
  }

  get isPasswordValid() {
    return this.isFieldValid('password');
  }

  isFieldValid(field: string) {
    return (
      this.loginForm.get(field)?.invalid && this.loginForm.get(field)?.touched
    );
  }
}
