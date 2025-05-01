import { CanActivateFn, Router } from '@angular/router';
import { ROLES } from '../defines/defines';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';

export const managerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.getCurrentUserRole().pipe(
    map((currentUser) => {
      const isManager = currentUser?.role === ROLES.MANAGER;
      if (!isManager) {
        router.navigate(['/login']);
      }
      return isManager;
    })
  );
};
