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
  user = {
    displayName: '',
  };
  tempDisplayName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Fetch the user profile from the AuthService
    this.authService.getUserProfile().then((profile) => {
      this.user.displayName = profile.displayName;
      this.user.photoURL = profile.photoURL;
    });
  }

  onFieldChange() {
    this.isChanged = true;
  }

  validateField(fieldName: string) {
    // Add validation logic if needed
  }

  onFileSelected(file: File) {
    this.selectedFile = file;
    this.isChanged = true;
  }

  onUpdateProfile() {
    if (this.tempDisplayName.trim() === '') {
      alert('Display name is required');
      return;
    }
    this.user.displayName = this.tempDisplayName;
    console.log('Display name updated:', this.user.displayName);
  }

  showSnackbar(message: string) {
    // Implement snackbar logic here
    alert(message); // Replace with actual snackbar implementation
  }
}
