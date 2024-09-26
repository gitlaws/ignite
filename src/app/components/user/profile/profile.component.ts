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
  user = {
    displayName: '',
    photoURL: '',
  };
  tempDisplayName = '';
  tempPhotoURL = '';
  isChanged = false;

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
      this.tempDisplayName = profile.displayName;
      this.tempPhotoURL = profile.photoURL;
    });
  }

  onFieldChange() {
    this.isChanged = true;
  }

  validateField(fieldName: string) {
    // Add validation logic if needed
  }

  onUpdateProfile() {
    if (this.tempDisplayName.trim() === '') {
      alert('Display name is required');
      return;
    }
    if (this.tempPhotoURL.trim() === '') {
      alert('Photo URL is required');
      return;
    }

    this.authService
      .onUpdateProfile(this.tempDisplayName, this.tempPhotoURL)
      .then(() => {
        this.user.displayName = this.tempDisplayName;
        this.user.photoURL = this.tempPhotoURL;
        console.log('Profile updated:', this.user);
        this.snackbarService.callSnackbar('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        this.snackbarService.callSnackbar('Error updating profile');
      });
  }
}
