import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { authGuard } from './auth/guards/auth.guard';
import { UnauthorizedComponent } from './auth/components/unauthorized/unauthorized.component';

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
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/pages/user/user.component').then(
            (m) => m.UserComponent
          ),
      },
      {
        path: 'admin',
        loadComponent: () =>
          import('./dashboard/pages/admin/admin.component').then(
            (m) => m.AdminComponent
          ),
        canActivate: [authGuard],
        data: {
          role: 'ADMIN',
        },
      },
      {
        path: 'timeline/:userId',
        loadComponent: () =>
          import(
            './dashboard/pages/post/timeline/post-timeline.component'
          ).then((m) => m.PostTimelineComponent),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./dashboard/pages/post/details/post-details.component').then(
            (m) => m.PostDetailsComponent
          ),
      },
      {
        path: 'user-remove',
        loadComponent: () =>
          import('./dashboard/pages/user-remove/user-remove.component').then(
            (m) => m.UserRemoveComponent
          ),
        canActivate: [authGuard],
        data: {
          role: 'MODERATOR',
        },
      },
      {
        path: 'manage-post',
        loadComponent: () =>
          import('./dashboard/pages/post/manage/manage-create.component').then(
            (m) => m.PostCreateComponent
          ),
        canActivate: [authGuard],
      },
      // {
      //   path: 'users-timeline',
      //   loadComponent: () =>
      //     import(
      //       './dashboard/pages/components/users-timeline/users-timeline.component'
      //     ).then((m) => m.UsersTimelineComponent),
      //   canActivate: [authGuard],
      //   data: {
      //     role: 'ADMIN',
      //   },
      // },
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
