// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from '../state/auth/auth.actions'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private store: Store, private router: Router) { }

  verifyCredentials(credentials: { username: string, password: string }): Observable<any> {
    return this.http.get<any>('http://localhost:4200/assets/db.json').pipe(
      map((data: any) => {
        const user = data.user.find((u: any) => u.username === credentials.username && u.password === credentials.password);
        if (user) {
          this.store.dispatch(AuthActions.loginSuccess());
          console.log('è entrato dentro auth service');
          this.router.navigate(['/home']); // Reindirizza l'utente alla home
          return { success: true };
        } else {
          this.store.dispatch(AuthActions.loginFailure({ error: 'Invalid credentials' }));
          console.log('è entrato in else')
          return { success: false, error: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        this.store.dispatch(AuthActions.loginFailure({ error: 'An error occurred during login' }));
        return of({ success: false, error: 'An error occurred during login' });
      })
    );
  }
}
