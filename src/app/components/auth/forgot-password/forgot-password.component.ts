import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  onSubmit() {
    this.authService
      .sendPasswordResetEmail(this.email)
      .then(() => {
        this.snackbarService.callSnackbar('Password reset email sent.');
      })
      .catch((error) => {
        console.error('Password reset error', error);
        this.snackbarService.callSnackbar('Error: ' + error.message);
      });
  }
}
