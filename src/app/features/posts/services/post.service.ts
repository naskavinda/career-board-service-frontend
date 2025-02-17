import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { CreatePostRequest } from '../models/create-post-request.model';
import { UpdatePostRequest } from '../models/update-post-request.model';
import { environment } from '../../../../environments/environment';

export type CreatePostResponse = Post | string;

export interface PostResponse {
  content: Post[];
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api`;

  // Helper function to create headers (Optional, for CSRF support)
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({ 'X-CSRF-TOKEN': this.getCsrfToken() });
  }

  // Function to get CSRF token from cookies (if required)
  private getCsrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]*)/);
    return match ? match[1] : '';
  }

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/user/${userId}`, {
      withCredentials: true,
    });
  }

  getAllPosts(page: number, size: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseUrl}/post`, {
      params: { page: page.toString(), size: size.toString() },
      withCredentials: true,
    });
  }

  createPost(postData: CreatePostRequest): Observable<CreatePostResponse> {
    return this.http.post<CreatePostResponse>(
      `${this.baseUrl}/post`,
      postData,
      {
        headers: this.getHeaders(),
        withCredentials: true,
      }
    );
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/post/${postId}`, {
      withCredentials: true,
    });
  }

  updatePost(postData: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/post`, postData, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }
}
