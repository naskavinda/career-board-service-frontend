import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UsersTimelineDetailsComponent } from './users-timeline-details/users-timeline-details.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users-timeline',
  standalone: true,
  imports: [CommonModule, UsersTimelineDetailsComponent],
  templateUrl: './users-timeline.component.html',
  styleUrls: ['./users-timeline.component.scss'],
})
export class UsersTimelineComponent implements OnInit {
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
