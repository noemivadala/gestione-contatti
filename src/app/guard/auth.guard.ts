import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { IsLog } from '../state/auth/auth.reducer';

export const authGuard = () => {
  const router = inject(Router)
  //prende lo stato da auth.reducer
  const isUserLoggedIn = IsLog;
  if (!isUserLoggedIn) {
    //se non fa il log rendirizza al login
    router.navigateByUrl('login');
  }
  return isUserLoggedIn;
}
