import { Component } from '@angular/core';
import { LoginInfoComponent } from '../login/login-info/login-info.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [LoginInfoComponent, LoginComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {}
