import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { UpdateButtonComponent } from './update-button/update-button.component';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    SnackbarComponent,
    DropZoneComponent,
    UpdateButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {
    displayName: '',
    photoURL: '',
  };
  tempDisplayName: string = '';
  tempPhotoURL: string = '';
  disabled: boolean = true;
  isChanged: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Fetch the user profile from the AuthService
    this.authService.getUserProfile().then((profile) => {
      this.user.displayName = profile.displayName;
      this.user.photoURL = profile.photoURL;
    });

    // Initialize user data
    this.tempDisplayName = '';
    this.tempPhotoURL = '';
    this.disabled = true;
  }

  onFieldChange(): void {
    this.isChanged = true;
    this.disabled = !this.tempDisplayName.trim() && !this.tempPhotoURL.trim();
  }

  validateField(fieldName: string): void {
    // Add validation logic if needed
  }

  get isUpdateDisabled(): boolean {
    return (
      this.tempDisplayName === this.user.displayName &&
      this.tempPhotoURL === this.user.photoURL
    );
  }

  onUpdateProfile(): void {
    if (this.tempDisplayName.trim() === '' && this.tempPhotoURL.trim() === '') {
      alert('Please enter a display name or photo URL to update.');
      return;
    }

    if (this.tempDisplayName.trim() !== '') {
      this.user.displayName = this.tempDisplayName;
    }

    if (this.tempPhotoURL.trim() !== '') {
      this.user.photoURL = this.tempPhotoURL;
    }

    this.authService
      .onUpdateProfile(this.tempDisplayName, this.tempPhotoURL)
      .then(() => {
        this.tempDisplayName = '';
        this.tempPhotoURL = '';
        this.disabled = true;
        this.snackbarService.callSnackbar('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        this.snackbarService.callSnackbar('Error updating profile');
      });
  }
}
