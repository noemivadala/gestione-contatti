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
    //chiamata al database
    return this.http.get<any>('http://localhost:4200/assets/db.json').pipe(
      map((data: any) => {
        const user = data.user.find((u: any) => u.username === credentials.username && u.password === credentials.password);
        //se l'utente esiste fai
        if (user) {
          this.store.dispatch(AuthActions.loginSuccess());
          this.router.navigate(['/home']); // Reindirizza l'utente alla home
          return { success: true };
        } else {
          this.store.dispatch(AuthActions.loginFailure({ error: 'Credenziali non valide' }));
          return { success: false, error: 'Credenziali non valide' };
        }
      }),
    );
  }
}
