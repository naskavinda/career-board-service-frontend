import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from './delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-remove',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatSnackBarModule, 
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './user-remove.component.html',
  styleUrls: ['./user-remove.component.scss']
})
export class UserRemoveComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['userId', 'username', 'firstName', 'lastName', 'role', 'postCount', 'actions'];

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.fetchUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.snackBar.open('Error loading users', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: { username: user.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.userId).subscribe({
          next: (response) => {
            if (response === 'user is deleted') {
              this.snackBar.open('User deleted successfully', 'Close', { duration: 3000 });
              this.loadUsers();
            } else {
              this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
            }
          },
          error: (error) => {
            this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
