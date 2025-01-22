import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ImageService } from '../services/image.service';
import { PresignImageResponse } from '../models/presign-image-response.model';

interface ImagePreview {
  file: File;
  url: string;
}

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
    MatProgressBarModule,
    MatIconModule
  ],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  postForm: FormGroup;
  selectedFiles: File[] = [];
  uploadProgress: number = 0;
  isUploading: boolean = false;
  imagePreviews: ImagePreview[] = [];

  imageService = inject(ImageService);
  authService = inject(AuthService);

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      status: ['DRAFT', [Validators.required]],
    });
  }

  onFileSelected(event: any) {
    const files: FileList | null = event.target.files;
    if (files) {
      console.log('Selected files:', files);

      

      let newFiles: File[] = Array.from(files).map(
        (file: File, index: number) => {
          console.log(file.name.split('.').pop());
          const timestamp = Date.now() + "_" + index;
          Object.defineProperty(file, 'name', {
            writable: true,
            value: timestamp + '.' + file.name.split('.').pop(),
          });
          return file;
        }
      );
      const nameList = newFiles.map((file: File) => `${this.authService.getUserId()}/${file.name}`);
      console.log(nameList);
      this.imageService.getPresignedUploadUrl(nameList).subscribe({
        next: (response) => {
          newFiles.forEach((file: File) => {
            console.log(response);
            const presignedUrl = response.find((res: PresignImageResponse) => {
              const isMatching = res.key.includes(file.name)
              console.log(res.key);
              console.log(file.name);
              console.log(isMatching);
              return isMatching
            })!.url;
            this.imageService
              .uploadFile(file, presignedUrl)
              .subscribe({
                next: (response) => {
                  console.log('File uploaded successfully:', response);
                },
                error: (error) => {
                  console.error('File upload failed:', error);
                },
              });
          })
        },
      });

      this.selectedFiles = [...this.selectedFiles, ...newFiles];
      
      // Generate previews for each new file
      newFiles.forEach((file: File) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreviews.push({
              file: file,
              url: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  removeImage(index: number) {
    this.imagePreviews.splice(index, 1);
    this.selectedFiles = this.imagePreviews.map(preview => preview.file);
  }

  async onSubmit() {
    if (this.postForm.valid) {
      try {
        this.isUploading = true;

        // Create post with image names
        const postData = {
          ...this.postForm.value,
          userId: this.authService.getUserId(),
          // imageNames: this.selectedFiles.map(file => file.name)
        };

        this.http.post<{ postId: number }>('http://localhost:8081/api/post', postData).subscribe({
          next: (response) => {
            this.snackBar.open('Post created successfully!', 'Close', {
              duration: 3000,
            });
            this.router.navigate(['/dashboard/post', response.postId]);
          },
          error: (error) => {
            this.snackBar.open('Error creating post: ' + error.message, 'Close', {
              duration: 3000,
            });
          }
        });
      } catch (error: any) {
        this.snackBar.open('Error uploading images: ' + error.message, 'Close', {
          duration: 3000,
        });
      } finally {
        this.isUploading = false;
        this.uploadProgress = 0;
      }
    }
  }
}
