import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../service/auth.service';
import { AppState } from './auth.reducer';

@Injectable()
export class AuthEffects {

  // variabile stato attuale
  private currentAuthState: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {
    // salvataggio stato attuale
    this.store.select(state => state.auth).pipe(
      tap(authState => this.currentAuthState = { ...authState }) // clona lo stato
    ).subscribe();
  }

  // effetto per gestire la richiesta di login
  requestLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.requestLogin), // filtra solo le azioni di tipo requestLogin
    mergeMap(action =>
      this.authService.verifyCredentials(action.credentials).pipe(
        map(response => {
          if (response && response.success) {
            // Se le credenziali sono valide
            this.toastr.success('Login effettuato'); //notifica di successo
            return AuthActions.loginSuccess();
          } else {
            // Se le credenziali non sono valide
            this.toastr.warning('Le credenziali non corrette'); //notifica di errore
            return AuthActions.loginFailure({ error: 'Credenziali non valide' }); //azione di errore
          }
        }),
        catchError(error => {
          // Gestione errori
          this.toastr.error('Errore');
          return of(AuthActions.loginFailure({ error: 'Errore' })); //azione di errore
        })
      )
    )
  ));

}
