import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Post {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
}

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
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

  private fetchPost(postId: string) {
    this.loading = true;
    this.error = null;
    
    this.http.get<Post>(`http://localhost:8081/api/post/${postId}`)
      .subscribe({
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
}
