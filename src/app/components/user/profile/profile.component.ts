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
    bio: '',
  };
  tempDisplayName: string = '';
  tempPhotoURL: string = '';
  tempBio: string = ''; // Define the tempBio property
  disabled: boolean = true;
  isChanged: boolean = false;
  profileCompletion: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    // Retrieve values from local storage
    const storedDisplayName = localStorage.getItem('displayName');
    const storedPhotoURL = localStorage.getItem('photoURL');
    const storedBio = localStorage.getItem('bio');

    if (storedDisplayName) {
      this.user.displayName = storedDisplayName;
      this.tempDisplayName = storedDisplayName;
    }

    if (storedPhotoURL) {
      this.user.photoURL = storedPhotoURL;
      this.tempPhotoURL = storedPhotoURL;
    }

    if (storedBio) {
      this.user.bio = storedBio;
      this.tempBio = storedBio;
    }

    // Fetch the user profile from the AuthService
    this.authService.getUserProfile().then((profile) => {
      this.user.displayName = profile.displayName || this.user.displayName;
      this.user.photoURL = profile.photoURL || this.user.photoURL;
      this.user.bio = profile.bio || this.user.bio;
      this.tempDisplayName = this.user.displayName;
      this.tempPhotoURL = this.user.photoURL;
      this.tempBio = this.user.bio;
    });

    this.disabled = true;
  }

  onFieldChange(): void {
    this.isChanged = true;
    this.disabled =
      !this.tempDisplayName.trim() &&
      !this.tempPhotoURL.trim() &&
      !this.tempBio.trim();
    this.profileCompletion = this.calculateProfileCompletion();
  }

  validateField(fieldName: string): void {
    // Add validation logic if needed
  }

  get isUpdateDisabled(): boolean {
    return (
      this.tempDisplayName === this.user.displayName &&
      this.tempPhotoURL === this.user.photoURL &&
      this.tempBio === this.user.bio
    );
  }

  onUpdateProfile(): void {
    if (
      this.tempDisplayName.trim() === '' &&
      this.tempPhotoURL.trim() === '' &&
      this.tempBio.trim() === ''
    ) {
      alert('Please enter a display name, photo URL, or bio to update.');
      return;
    }

    if (this.tempDisplayName.trim() !== '') {
      this.user.displayName = this.tempDisplayName;
    }

    if (this.tempPhotoURL.trim() !== '') {
      this.user.photoURL = this.tempPhotoURL;
    }

    if (this.tempBio.trim() !== '') {
      this.user.bio = this.tempBio;
    }

    // Store values in local storage
    localStorage.setItem('displayName', this.user.displayName);
    localStorage.setItem('photoURL', this.user.photoURL);
    localStorage.setItem('bio', this.user.bio);

    this.authService
      .onUpdateProfile(this.tempDisplayName, this.tempPhotoURL)
      .then(() => {
        this.tempDisplayName = this.user.displayName;
        this.tempPhotoURL = this.user.photoURL;
        this.tempBio = this.user.bio;
        this.disabled = true;
        this.snackbarService.callSnackbar('Profile updated successfully');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        this.snackbarService.callSnackbar('Error updating profile');
      });
  }

  removePhoto(): void {
    this.user.photoURL = '';
    this.tempPhotoURL = '';
    localStorage.removeItem('photoURL');
    this.authService
      .onUpdateProfile(this.user.displayName, '')
      .then(() => {
        this.snackbarService.callSnackbar('Photo removed successfully');
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
    if (this.tempBio) completion += 25;
    return completion;
  }
}
