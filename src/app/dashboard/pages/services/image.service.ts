import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresignImageResponse } from '../models/presign-image-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8081/api/images';

  getPresignedUploadUrl(
    imageNames: Array<string>
  ): Observable<Array<PresignImageResponse>> {
    console.log(imageNames);
    return this.http.post<Array<PresignImageResponse>>(
      `${this.baseUrl}/upload-url`,
      imageNames
    );
  }

  uploadFile(file: File, presignedUrl: string): Observable<any> {
    // Set headers if required (e.g., Content-Type)
    const headers = new HttpHeaders({
      'Content-Type': file.type, // Set the file's MIME type
    });
    console.log(file);
    // Send the PUT request with the file as the body
    return this.http.put(presignedUrl, file, { headers });
  }
}
