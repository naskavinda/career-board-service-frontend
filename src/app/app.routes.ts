import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { authGuard } from './auth/guards/auth.guard';
import { UnauthorizedComponent } from './auth/components/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [publicGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [publicGuard],
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
    ],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
