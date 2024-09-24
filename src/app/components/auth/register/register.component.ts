import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterInfoComponent } from './register-info/register-info.component';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RegisterInfoComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [SnackbarService],
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
      });
  }
}
