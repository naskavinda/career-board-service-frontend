import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
  selector: 'app-post-timeline',
  standalone: true,
  imports: [CommonModule, PostListComponent],
  templateUrl: './post-timeline.component.html',
  styleUrls: ['./post-timeline.component.scss'],
})
export class PostTimelineComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {}

  userId() {
    let userId = this.route.snapshot.paramMap.get('userId');
    if (userId === null) {
      this.router.navigate(['/dashboard']);
      return '';
    }
    return userId;
  }
}
