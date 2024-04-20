// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  verifyCredentials(credentials: { username: string, password: string }): Observable<any> {
    return this.http.get<any>('assets/db.json')
      .pipe(
        map((data: any) => {
          const user = data.user.find((u: any) => u.username === credentials.username && u.password === credentials.password);
          if (user) {
            return { success: true };
          } else {
            return { success: false, error: 'Invalid credentials' };
          }
        })
      );
  }
}
