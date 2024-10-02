import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { UpdateButtonComponent } from './update-button/update-button.component';
import { SnackbarService } from '../../../services/snackbar.service';
import { UserService } from '../../../services/user.service';

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
  profileCompletion: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Retrieve user data from UserService
    this.user = this.userService.getUser();

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
    localStorage.setItem('displayName', this.user.displayName);
    localStorage.setItem('photoURL', this.user.photoURL);

    this.authService
      .onUpdateProfile(this.user.displayName, this.user.photoURL)
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
      .onUpdateProfile(this.user.displayName, '')
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
    // Logic to calculate profile completion percentage
    // This is just an example, adjust it according to your requirements
    let completion = 0;
    if (this.user.photoURL) completion += 50;
    if (this.tempDisplayName) completion += 50;
    return completion;
  }

  onFileSelected(fileDataUrl: string) {
    this.userService.updateUserPhoto(fileDataUrl);
    this.user = this.userService.getUser(); // Update the local user data
    this.onFieldChange();
  }

  updateUserMenuPhoto() {
    // Implement the logic to update the profile photo in the user menu
    const userMenuPhotoElement = document.querySelector('.user-menu-photo');
    if (userMenuPhotoElement) {
      userMenuPhotoElement.setAttribute('src', this.user.photoURL);
    }
    console.log('User menu photo updated');
  }
}
