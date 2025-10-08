import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth-service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  let router = inject(Router);
  let clonedReq = req;

  const excludedRoutes = [
    '/auth/login',
    '/auth/redeem-password',
  ];

  if (excludedRoutes.some(url => req.url.includes(url))) {
    return next(req);
  }

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403) && token) {
        console.log('Token expired or invalid. Logging out...');
        authService.logout();
        router.navigateByUrl('/login');
      }

      return throwError(() => error);
    })
  );
}
