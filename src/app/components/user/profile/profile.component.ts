import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
import { DropZoneComponent } from './drop-zone/drop-zone.component';
import { UpdateButtonComponent } from './update-button/update-button.component';

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
  user: { displayName: string; photoURL: string } = {
    displayName: '',
    photoURL: '',
  };
  tempDisplayName: string = '';
  tempPhotoURL: string = '';
  isChanged: boolean = false;
  selectedFile: File | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the user profile from the AuthService
    this.authService.getUserProfile().then((profile) => {
      this.user.displayName = profile.displayName;
      this.user.photoURL = profile.photoURL;
      this.tempDisplayName = this.user.displayName;
      this.tempPhotoURL = this.user.photoURL;
    });
  }

  onFieldChange() {
    this.isChanged =
      this.tempDisplayName !== this.user.displayName ||
      this.tempPhotoURL !== this.user.photoURL;
  }

  validateField(fieldName: string) {
    // Add validation logic if needed
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
    this.isChanged = true;
  }

  onUpdateProfile() {
    if (this.selectedFile) {
      this.authService
        .uploadProfilePicture(this.selectedFile)
        .then((photoURL) => {
          this.user.photoURL = photoURL;
          this.updateProfile();
        });
    } else {
      this.updateProfile();
    }
  }

  updateProfile() {
    this.user.displayName = this.tempDisplayName;
    this.user.photoURL = this.tempPhotoURL;
    this.authService
      .onUpdateProfile(this.user.displayName, this.user.photoURL)
      .then(() => {
        this.isChanged = false;
        this.showSnackbar('Profile updated successfully!');
      });
  }

  showSnackbar(message: string) {
    // Implement snackbar logic here
    alert(message); // Replace with actual snackbar implementation
  }
}