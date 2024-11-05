import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginInfoComponent } from './login-info/login-info.component';
import { SnackbarService } from '../../../services/snackbar.service'; // Import SnackbarService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LoginInfoComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginAttempts: number = 0;
  maxAttempts: number = 5;
  lockoutTime: number = 30000; // 30 seconds
  isLockedOut: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {}

  login() {
    if (this.isLockedOut) {
      this.snackbarService.callSnackbar(
        'Too many login attempts. Please try again later.'
      );
      return;
    }

    this.authService
      .login(this.email, this.password)
      .then(() => {
        this.router.navigate(['/profile']);
      })
      .catch((error) => {
        this.loginAttempts++;
        if (this.loginAttempts >= this.maxAttempts) {
          this.isLockedOut = true;
          setTimeout(() => {
            this.isLockedOut = false;
            this.loginAttempts = 0;
          }, this.lockoutTime);
        }
        this.snackbarService.callSnackbar('Login error: ' + error.message); // Use SnackbarService for error message
        console.error('Login error', error);
      });
  }

  onSubmit() {
    this.login();
  }
}
