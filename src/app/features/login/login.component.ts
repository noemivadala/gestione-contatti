import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import * as AuthActions from '../../state/auth/auth.actions'
import { AppState } from '../../state/auth/auth.reducer';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  template: `
    <div class="container">
      <h2>Login</h2>
      <form [formGroup]="loginform" (ngSubmit)="login()">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="text" class="form-control" id="exampleInputEmail1" formControlName="username" placeholder="Enter username">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" formControlName="password" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Enter</button>
      </form>
    </div>
  `,
  styles: ``
})
export class LoginComponent {
  
  constructor(private form: FormBuilder, private router: Router, private toastr: ToastrService, private store: Store<AppState>) {}

  loginform = this.form.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  login() {
    const username = this.loginform.value.username ?? '';
    const password = this.loginform.value.password ?? '';
  
    const credentials = {
      username,
      password
    };
    console.log(credentials);
  
    // Invia le credenziali al dispatcher
    this.store.dispatch(AuthActions.requestLogin({ credentials }));
  }
};
