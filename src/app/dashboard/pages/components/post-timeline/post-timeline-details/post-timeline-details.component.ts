import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-timeline-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './post-timeline-details.component.html',
  styleUrls: ['./post-timeline-details.component.scss']
})
export class PostTimelineDetailsComponent {
  @Input() post!: Post;

  constructor(private router: Router) {}

  navigateToPost() {
    console.log(this.post.postId);
    this.router.navigate(['/dashboard/post', this.post.postId]);
  }
}
