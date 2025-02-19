import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './features/auth/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./core/components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/posts/components/all-posts/all-posts.component').then(
            (m) => m.AllPostsComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'my-posts',
        loadComponent: () =>
          import('./features/posts/components/user-post-list/user-post-list.component').then(
            (m) => m.UserPostListComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./features/users/components/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
        canActivate: [authGuard],
        data: {
          role: ['ADMIN'],
        },
      },
      {
        path: 'timeline/:userId',
        loadComponent: () =>
          import(
            './features/posts/components/timeline/post-timeline.component'
          ).then((m) => m.PostTimelineComponent),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./features/posts/components/details/post-details.component').then(
            (m) => m.PostDetailsComponent
          ),
      },
      {
        path: 'post/edit/:id',
        loadComponent: () =>
          import('./features/posts/components/manage/manage-create.component').then(
            (m) => m.PostCreateComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'user-remove',
        loadComponent: () =>
          import('./features/users/components/remove/remove.component').then(
            (m) => m.RemoveComponent
          ),
        canActivate: [authGuard],
        data: {
          role: ['MODERATOR', 'ADMIN'],
        },
      },
      {
        path: 'manage-post',
        loadComponent: () =>
          import('./features/posts/components/manage/manage-create.component').then(
            (m) => m.PostCreateComponent
          ),
        canActivate: [authGuard],
      }
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
