import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RedirectCommand,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isValidToken()) {
    return new RedirectCommand(router.parseUrl('/login'));
  }

  const role = state.root.firstChild?.firstChild?.data?.['role'];
  if (!role) {
    return true;
  }

  const userRoles = authService.getUserRole();
  if (!userRoles || !userRoles.includes(role)) {
    return new RedirectCommand(router.parseUrl('/unauthorized'));
  }

  return true;
};
