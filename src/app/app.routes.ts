import { Routes } from '@angular/router';

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
    path: 'signup',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  // other routes...
];
