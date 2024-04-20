import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../service/auth.service';
import { AppState } from './auth.reducer';

@Injectable()
export class AuthEffects {

  // Variabile per salvare lo stato attuale
  private currentAuthState: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {
    // Salvataggio dello stato attuale nell'istanza dell'effetto
    this.store.select(state => state.auth).pipe(
      tap(authState => this.currentAuthState = authState)
    ).subscribe();
  }

  requestLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.requestLogin),
    mergeMap(action =>
      this.authService.verifyCredentials(action.credentials).pipe(
        map(response => {
          if (response && response.success) {
            // Se le credenziali sono valide
            this.toastr.success('Login successful');
            console.log('successo');
            console.log('Stato attuale true:', this.currentAuthState);
            return AuthActions.loginSuccess();
          } else {
            // Se le credenziali non sono valide
            this.toastr.warning('Please enter username and password');
            console.log('errore');
            console.log('Stato attuale false:', this.currentAuthState);
            return AuthActions.loginFailure({ error: 'Invalid credentials' });
          }
        }),
        catchError(error => {
          // Gestione errori
          this.toastr.error('An error occurred during login');
          console.log('Errore:', error);
          console.log('Stato attuale:', this.currentAuthState);
          return of(AuthActions.loginFailure({ error: 'An error occurred during login' }));
        })
      )
    )
  ));

}
