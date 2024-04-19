import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login/login.component';

export const routes: Routes = [
    { path: '', component: AppComponent},
    { path: 'login', component: LoginComponent}
];
