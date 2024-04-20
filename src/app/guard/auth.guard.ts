import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../state/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.auth.isLoggedIn).pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']); // Reindirizza l'utente alla home
          return true;
        } else {
          this.router.navigate(['/login']); // Reindirizza l'utente al login
          return false;
        }
      })
    );
  }
}

