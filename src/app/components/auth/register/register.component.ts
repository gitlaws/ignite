import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RegisterInfoComponent,
    RouterLink,
    SnackbarComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  password!: string;
  email!: string;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  register() {
    this.authService
      .register(this.email, this.password)
      .then(() => {
        this.snackbarService.callSnackbar(
          'Registered, check email for confirmation'
        );
      })
      .catch((error) => {
        console.error('Registration error', error);
        this.snackbarService.callSnackbar(
          'Registration failed: ' + error.message
        );
      });
  }
}
