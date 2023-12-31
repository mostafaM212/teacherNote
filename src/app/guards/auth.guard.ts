import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAuthenticated$.pipe(
    map((data) => {
      if (!data) {
        router.navigate(['/auth', 'login']);
        return false;
      }
      return true;
    })
  );
};
