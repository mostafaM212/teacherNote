import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authMatchGuard: CanMatchFn = (route, segments) => {
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
