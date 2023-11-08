import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const notAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  let router = inject(Router);
  // console.log('test', authService.isAuthenticated$.getValue());

  // return true;
  return authService.isAuthenticated$.pipe(
    map((data) => {
      if (!data) {
        return true;
      }
      router.navigate(['/home']);
      return true;
    })
  );
};
