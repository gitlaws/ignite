// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { SnackbarService } from '../../../services/snackbar.service';
import { UserService } from '../../../services/user.service';
import { AppUser } from '../../../models/user.models';
import { DropZoneComponent } from './drop-zone/drop-zone.component';

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
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: AppUser = {
    displayName: '',
    photoURL: '',
  };
  tempDisplayName: string = '';
  tempPhotoURL: string = '';
  disabled: boolean = true;
  isChanged: boolean = false;
  profileCompletion: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.authService.getUserProfile().then((profile) => {
      this.user.displayName = profile.displayName;
      this.user.photoURL = profile.photoURL;
    });
    this.tempDisplayName = '';
    this.tempPhotoURL = '';
    this.disabled = true;
  }

  onFieldChange(): void {
    this.isChanged = true;
    this.disabled = !this.tempDisplayName.trim() && !this.tempPhotoURL.trim();
    this.profileCompletion = this.calculateProfileCompletion();
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
      return;
    }

    if (this.tempDisplayName.trim() !== '') {
      this.user.displayName = this.tempDisplayName;
    }

    if (this.tempPhotoURL.trim() !== '') {
      this.user.photoURL = this.tempPhotoURL;
    }

    // Store values in local storage
    localStorage.setItem('displayName', this.user.displayName ?? '');
    localStorage.setItem('photoURL', this.user.photoURL ?? '');

    this.authService
      .onUpdateProfile(this.user.displayName ?? '', this.user.photoURL ?? '')
      .then(() => {
        this.tempDisplayName = '';
        this.tempPhotoURL = '';
        this.disabled = true;
        this.snackbarService.callSnackbar('Profile updated successfully');
        this.updateUserMenuPhoto();
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        this.snackbarService.callSnackbar('Error updating profile');
      });
  }

  removePhoto(): void {
    this.user.photoURL = '';
    localStorage.removeItem('photoURL');
    this.authService
      .onUpdateProfile(this.user.displayName ?? '', '')
      .then(() => {
        this.snackbarService.callSnackbar('Photo removed successfully');
        this.updateUserMenuPhoto();
      })
      .catch((error) => {
        console.error('Error removing photo:', error);
        this.snackbarService.callSnackbar('Error removing photo');
      });
  }

  calculateProfileCompletion(): number {
    let completion = 0;
    if (this.user.photoURL) completion += 50;
    if (this.tempDisplayName) completion += 50;
    return completion;
  }

  onFileSelected(fileDataUrl: string): void {
    this.tempPhotoURL = fileDataUrl;
    this.onFieldChange();
  }

  updateUserMenuPhoto(): void {
    const userMenuPhotoElement = document.querySelector('.user-menu-photo');
    if (userMenuPhotoElement) {
      userMenuPhotoElement.setAttribute('src', this.user.photoURL ?? '');
      this.snackbarService.callSnackbar('User menu photo updated successfully');
    }
  }
}
