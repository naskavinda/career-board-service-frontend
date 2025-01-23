import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { register } from 'swiper/element/bundle';

// Register Swiper custom elements
register();

/**
 * Post details component
 */
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
    private postService: PostService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.fetchPost(postId);
    }
  }

  private fetchPost(postId: string) {
    this.postService.getPost(postId).subscribe({
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
