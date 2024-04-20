import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../state/auth/auth.reducer';
import { map, Observable } from 'rxjs';

export class authGuard {

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(state => state.auth.isLoggedIn), // Seleziona lo stato di autenticazione
      map(isLoggedIn => {
        if (isLoggedIn) {
          console.log('è true');
          return true; // L'utente è autenticato, consenti l'accesso alla rotta
        } else {
          console.log('è false');
          this.router.navigateByUrl('/login'); // L'utente non è autenticato, reindirizza alla pagina di login
          return false;
        }
      })
    );
  }
}
