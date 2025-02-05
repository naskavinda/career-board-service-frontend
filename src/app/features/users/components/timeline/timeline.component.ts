import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../posts/models/user.model';
import { UserPostsComponent } from '../../../posts/components/user-posts/user-posts.component';
import { UserService } from '../../../posts/services/user.service';

@Component({
  selector: 'app-users-timeline',
  standalone: true,
  imports: [CommonModule, UserPostsComponent],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  private fetchUsers() {
    this.userService.fetchUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }
}
