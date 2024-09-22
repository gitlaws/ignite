import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('./components/common/home/home.component').then(
//         (m) => m.HomeComponent
//       ),
//   },
//   {
//     path: 'home',
//     loadComponent: () =>
//       import('./components/common/home/home.component').then(
//         (m) => m.HomeComponent
//       ),
//   },
//   {
//     path: 'register',
//     loadComponent: () =>
//       import('./components/auth/register/register.component').then(
//         (m) => m.RegisterComponent
//       ),
//   },
//   {
//     path: 'login',
//     loadComponent: () =>
//       import('./components/auth/login/login.component').then(
//         (m) => m.LoginComponent
//       ),
//   },
//   {
//     path: 'signout',
//     loadComponent: () =>
//       import('./components/auth/signout/signout.component').then(
//         (m) => m.SignoutComponent
//       ),
//   },
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
// ];

const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./components/common/home/home.component').then(
        (m) => m.HomeComponent
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
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/user/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
