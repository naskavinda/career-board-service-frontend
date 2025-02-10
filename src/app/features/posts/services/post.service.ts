import { HttpClient } from '@angular/common/http';
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

  getUserPosts(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/user/${userId}`);
  }

  getAllPosts(page: number, size: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(`${this.baseUrl}/post`, {
      params: { page: page.toString(), size: size.toString() }
    });
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
