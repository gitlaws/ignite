import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth'; // Correct import for User type
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName!: string;
  photoURL!: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.displayName = user?.displayName || '';
      this.photoURL = user?.photoURL || '';
    });
  }

  updateProfile() {
    this.authService
      .updateProfile(this.displayName, this.photoURL)
      .catch((error) => {
        console.error('Update profile error', error);
      });
  }

  logout() {
    this.authService.logout();
  }
}
