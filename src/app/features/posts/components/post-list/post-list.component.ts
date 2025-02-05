import {Component, inject, input, OnInit} from '@angular/core';
import {PostComponent} from "../post/post.component";
import {Post} from '../../models/post.model';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  imports: [
    PostComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  userId = input.required<string>();

  private postService = inject(PostService);
  posts: Post[] = [];

  ngOnInit() {
    this.loadUserPosts();
  }

  private loadUserPosts() {
    this.postService.getUserPosts(this.userId()).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts || [];
      },
      error: (error: any) => {
        this.posts = [];
      },
    });
  }
}
