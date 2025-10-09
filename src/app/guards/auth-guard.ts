import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isAuthenticated() && authService.getUserRole() === 'ADMIN') {
    return true;
  }

  console.warn('Access denied: User is not an admin.');
  router.navigateByUrl('/dashboard');
  return false;
};
