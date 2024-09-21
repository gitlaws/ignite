import { Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.componentonent';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/common/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  {
    path: 'Home',
    loadComponent: () =>
      import('./components/common/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },

  //   {
  //     path: 'projects',
  //     loadComponent: () =>
  //       import('./features/projects/projects.component').then(
  //         (component) => component.ProjectsComponent
  //       ),
  //   },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  // other routes...

  // { path: 'register', component: RegisterComponent },
  // { path: 'login', component: LoginComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];
