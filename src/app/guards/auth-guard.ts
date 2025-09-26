import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = localStorage.getItem('token');
  const router = inject(Router);

  if(isLoggedIn != null || isLoggedIn != '') {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};
