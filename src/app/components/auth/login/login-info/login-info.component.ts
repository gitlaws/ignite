import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-info',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './login-info.component.html',
  styleUrl: './login-info.component.scss',
})
export class LoginInfoComponent {}
