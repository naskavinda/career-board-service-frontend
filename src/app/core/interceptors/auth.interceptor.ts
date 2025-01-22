import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  if (req.url.includes('amazonaws.com')) {
    return next(req);
  }

  const authService = inject(AuthService);

  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(authReq);
  }

  return next(req);
};
