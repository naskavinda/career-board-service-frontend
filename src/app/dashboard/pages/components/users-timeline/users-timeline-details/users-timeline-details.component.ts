import { Component, input, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
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

  getPostCount(): number {
    return this.user().posts.length;
  }
}
