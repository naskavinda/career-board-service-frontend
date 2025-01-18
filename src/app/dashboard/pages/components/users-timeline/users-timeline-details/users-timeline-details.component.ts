import { Component, inject, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users-timeline-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './users-timeline-details.component.html',
  styleUrl: './users-timeline-details.component.scss',
})
export class UsersTimelineDetailsComponent {
  user = input.required<User>();
  router = inject(Router);

  getPostCount(): number {
    return this.user().posts.length;
  }

  navigateToPostTimeline() {
    this.router.navigateByUrl(`/dashboard/post-timeline/${this.user().userId}`);
  }
}
