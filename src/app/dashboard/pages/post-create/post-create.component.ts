import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      status: ['DRAFT', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postData = {
        ...this.postForm.value,
        userId: this.authService.getUserId(),
      };

      this.http.post<{ postId: number }>('http://localhost:8081/api/post', postData).subscribe({
        next: (response) => {
          this.snackBar.open('Post created successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/dashboard/post', response.postId]);
        },
        error: (error) => {
          this.snackBar.open(
            'Error creating post. Please try again.',
            'Close',
            {
              duration: 3000,
            }
          );
          console.error('Error creating post:', error);
        },
      });
    }
  }
}
