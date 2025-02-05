import { Component, inject, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-posts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
})
export class UserPostsComponent {
  user = input.required<User>();
  router = inject(Router);

  navigateToPostTimeline() {
    this.router.navigateByUrl(`/dashboard/timeline/${this.user().userId}`);
  }
}
