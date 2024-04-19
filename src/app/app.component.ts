import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  template: `
  <div class="container">
    <h2>Login</h2>
    <form [formGroup]="loginform" (ngSubmit)="login()">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" formControlName="email" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" formControlName="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  constructor(private form: FormBuilder) {}

  loginform = this.form.group({
    email: this.form.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.form.control('', Validators.compose([Validators.required])),
  })

  login(){};
}
