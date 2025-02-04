import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Post details component
 */
@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  error: string | null = null;
  selectedIndex = 0;

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
    return `https://supun-init.s3.amazonaws.com/${imageName}`;
  }

  // Carousel control methods
  onTabChange(index: number): void {
    this.selectedIndex = index;
  }

  previousImage(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    }
  }

  nextImage(): void {
    if (this.post?.images && this.selectedIndex < this.post.images.length - 1) {
      this.selectedIndex++;
    }
  }
}
