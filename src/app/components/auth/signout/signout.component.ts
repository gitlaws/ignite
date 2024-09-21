import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signout',
  standalone: true,
  imports: [],
  templateUrl: './signout.component.html',
  styleUrl: './signout.component.scss',
})
export class SignoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSignOut() {
    this.authService.signOut().then(() => {
      console.log('User signed out');
      this.router.navigate(['/login']); // Navigate to the login page
    });
  }
}
