import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterInfoComponent } from './register-info/register-info.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RegisterInfoComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  register() {
    this.authService.register(this.email, this.password).catch((error) => {
      console.error('Registration error', error);
    });
  }
}
