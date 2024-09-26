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

  onFieldChange(): void {
    this.isChanged = true;
  }

  validateField(fieldName: string) {
    // Add validation logic if needed
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.isChanged = true;
    }
  }

  onUpdateProfile(): void {
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

  updateProfile(): void {
    // Update profile logic
  }
}
