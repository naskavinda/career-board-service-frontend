import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { CreatePostRequest } from '../models/create-post-request.model';

export type CreatePostResponse = Post | string;

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8081/api';

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/user/${userId}`);
  }

  createPost(postData: CreatePostRequest): Observable<CreatePostResponse> {
    return this.http.post<CreatePostResponse>(`${this.baseUrl}/post`, postData);
  }
}
