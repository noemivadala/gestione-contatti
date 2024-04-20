import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { IsLog } from '../state/auth/auth.reducer';

export const authGuard = () => {
  const router = inject(Router)
  const isUserLoggedIn = IsLog;
  if (!isUserLoggedIn) {
    router.navigateByUrl('login');
  }
  return isUserLoggedIn
}
