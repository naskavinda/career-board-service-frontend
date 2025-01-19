import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { PostListComponent } from '../components/post-list/post-list.component';

@Component({
  selector: 'app-user',
  imports: [PostListComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
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
