import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();


@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for Swiper custom elements
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const postId = params['id'];
      if (postId) {
        this.fetchPost(postId);
      }
    });
  }

  private fetchPost(postId: number) {
    this.loading = true;
    this.http.get<Post>(`http://localhost:8081/api/post/${postId}`).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load post details';
        this.loading = false;
        console.error('Error fetching post:', error);
      }
    });
  }

  getImageUrl(imageName: string): string {
    return `https://supun-init-2.s3.amazonaws.com/${imageName}`;
  }
}
