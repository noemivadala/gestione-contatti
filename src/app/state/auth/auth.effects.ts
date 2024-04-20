import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  requestLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.requestLogin),
    mergeMap(action =>
      this.authService.verifyCredentials(action.credentials).pipe(
        map(isValid => {
          if (isValid) {
            // Se le credenziali sono valide
            this.toastr.success('Login successful');
            return AuthActions.loginSuccess();
          } else {
            // Se le credenziali non sono valide
            this.toastr.warning('Please enter username and password');
            return AuthActions.loginFailure({ error: 'Invalid credentials' });
          }
        }),
        catchError(error => {
          // Gestione errori
          this.toastr.error('An error occurred during login');
          return of(AuthActions.loginFailure({ error: 'An error occurred during login' }));
        })
      )
    )
  ));

}