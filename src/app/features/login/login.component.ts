import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions'
import { AppState } from '../../state/auth/auth.reducer';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  template: `
    <div class="container custom-container">
      <div class="text-center">
        <h2>Benvenuto!</h2>
        <p>Accedi per visualizzare i contenuti</p>
      </div>
      <form [formGroup]="loginform" (ngSubmit)="login()">
        <div class="form-group input-group">
          <input type="text" class="form-control" formControlName="username" placeholder="username">
          <span class="input-group-text"><i class="fa-regular fa-user" style="color: #7e7e7e"></i></span>
        </div>
        <div class="form-group input-group">
          <input type="password" class="form-control" formControlName="password" placeholder="password">
          <span class="input-group-text"><i class="fa-regular fa-address-card" style="color: #7e7e7e"></i></span>
        </div>
        <div>
          <button type="submit" class="btn btn-primary btn-submit" [ngClass]="!loginform.valid ? 'btn-submit-invalid' : 'btn-primary'"  [disabled]="!loginform.valid">Entra</button>
        </div>
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
  
    // credenziali
    const credentials = {
      username,
      password
    };
  
    // invia le credenziali al dispatcher
    this.store.dispatch(AuthActions.requestLogin({ credentials }));

    // pulisci il form
    this.loginform.reset();
  }
};
