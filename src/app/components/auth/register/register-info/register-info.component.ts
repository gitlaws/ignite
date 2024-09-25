import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-info',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './register-info.component.html',
  styleUrl: './register-info.component.scss',
})
export class RegisterInfoComponent {}
