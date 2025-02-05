import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { PostListComponent } from '../post-list/post-list.component';

@Component({
  selector: 'app-user-post-list',
  imports: [PostListComponent],
  templateUrl: './user-post-list.component.html',
  styleUrl: './user-post-list.component.scss',
})
export class UserPostListComponent {
  constructor(private authService: AuthService) {}

  userId() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.authService.logout();
      return '';
    }
    return userId;
  }
}
