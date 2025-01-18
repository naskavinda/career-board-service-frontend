import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { PostTimelineDetailsComponent } from './post-timeline-details/post-timeline-details.component';

@Component({
  selector: 'app-post-timeline',
  standalone: true,
  imports: [CommonModule, PostTimelineDetailsComponent],
  templateUrl: './post-timeline.component.html',
  styleUrls: ['./post-timeline.component.scss']
})
export class PostTimelineComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  userId: string = '';
  posts: Post[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.loadUserPosts();
    });
  }

  private loadUserPosts() {
    this.postService.getUserPosts(this.userId).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts || [];
        console.log('Posts loaded:', this.posts);
      },
      error: (error: any) => {
        console.error('Error loading posts:', error);
        this.posts = [];
      }
    });
  }
}
