import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../../assets/user.model';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderService {

  private jsonPlaceholderURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) { }

  //chiamata lista user
  getUsersList(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.jsonPlaceholderURL}/users`);
  }

  //chiamata creazione user
  createUser(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.jsonPlaceholderURL}/users`, user);
  }

  //chiamata modifica user
  editUser(id: number, user: UserModel): Observable<UserModel> {
    return this.http.patch<UserModel>(`${this.jsonPlaceholderURL}/users/${id}`, user);
  }

  //chiamata elimina user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.jsonPlaceholderURL}/users/${id}`);
  }

}
