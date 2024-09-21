import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignoutComponent } from './components/auth/signout/signout.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/common/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/common/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'signout',
    loadComponent: () =>
      import('./components/auth/signout/signout.component').then(
        (m) => m.SignoutComponent
      ),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
