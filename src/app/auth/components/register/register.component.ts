import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterRequest } from '../../models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    RouterLink,
    HttpClientModule,
  ],
  providers: [AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  roles = ['USER', 'ADMIN'];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      passwords: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(64),
            ],
          ],
          confirmPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(8),
              Validators.maxLength(64),
            ],
          ],
        },
        {
          validators: this.passwordMatchValidator,
        }
      ),
    });
  }

  getPasswordsFormControl() {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get isPasswordsMatch() {
    return (
      this.getPasswordsFormControl().errors?.['passwordMismatch'] &&
      this.getPasswordsFormControl().get('confirmPassword')?.touched
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;

      const registerRequest: RegisterRequest = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        username: formValue.username,
        password: formValue.passwords.password,
        role: 'USER',
      };

      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          if (response.success) {
            this.snackBar.open('Registration successful', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/login']);
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 3000 });
          }
        },
        error: (error) => {
          this.snackBar.open(
            'Registration failed. Please try again.',
            'Close',
            { duration: 3000 }
          );
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value === confirmPassword?.value) {
      return null;
    }
    return { passwordMismatch: true };
  }
}
