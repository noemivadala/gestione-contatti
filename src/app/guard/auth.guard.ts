import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router)
  let isLoggedIn = true;

  if (!isLoggedIn) {
    router.navigateByUrl('home')
  } else {
    router.navigateByUrl('login')
  }
  return isLoggedIn;
}



