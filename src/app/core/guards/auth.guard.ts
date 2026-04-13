import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

export const authGuard: CanActivateFn = () => {
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if(sessionService.isLoggedIn()){
    return true;
  }
  else{
    router.navigate(['/login']);
    return false;
  }
};
