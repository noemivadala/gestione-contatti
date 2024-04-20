import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  
  constructor(private form: FormBuilder, private router: Router, private toastr: ToastrService) {}

  loginform = this.form.group({
    email: this.form.control('', Validators.compose([Validators.required])),
    password: this.form.control('', Validators.compose([Validators.required])),
  })


  login(){
    if (this.loginform.valid){
      console.log('login');
      this.toastr.success('Login effettuato');
      this.router.navigate(['login']);
    } else {
      this.toastr.warning('Inserisci i dati corretti');
    }
  };

}
