import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { CreatePostRequest } from '../models/create-post-request.model';
import { UpdatePostRequest } from '../models/update-post-request.model';
import { environment } from '../../../../environments/environment';

export type CreatePostResponse = Post | string;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/api`;

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/user/${userId}`);
  }

  createPost(postData: CreatePostRequest): Observable<CreatePostResponse> {
    return this.http.post<CreatePostResponse>(`${this.baseUrl}/post`, postData);
  }

  getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/post/${postId}`);
  }

  updatePost(postData: UpdatePostRequest): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/post`, postData);
  }
}
