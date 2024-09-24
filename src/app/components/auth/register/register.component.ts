import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { RouterLink } from '@angular/router';
import { RegisterInfoComponent } from './register-info/register-info.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterInfoComponent, RouterLink], // Add FormsModule to imports array
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  password!: string;
  email!: string;

  constructor(private authService: AuthService) {}

  register() {
    this.authService
      .register(this.email, this.password)
      .then(() => {
        alert(
          'Registration successful! Please check your email to verify your account.'
        );
      })
      .catch((error) => {
        console.error('Registration error', error);
      });
  }
}
