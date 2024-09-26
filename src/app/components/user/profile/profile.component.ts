import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';
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
  validateField(arg0: string) {
    throw new Error('Method not implemented.');
  }
  user: User | null = null;
  displayName: string = '';
  photoURL: string | null = '';
  selectedFile: File | null = null;
  isChanged: boolean = false;
  initialDisplayName: string = '';
  initialPhotoURL: string | null = '';

  @ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
        this.initialDisplayName = this.displayName;
        this.initialPhotoURL = this.photoURL;
      }
    });
  }

  onFileSelected(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result !== undefined) {
        this.photoURL = e.target.result as string;
        this.cdr.detectChanges();
        this.checkForChanges();
      }
    };
    reader.readAsDataURL(this.selectedFile);
  }

  triggerFileInput(): void {
    this.profilePictureInput.nativeElement.click();
  }

  removePhoto(): void {
    this.photoURL = null;
    this.selectedFile = null;
    this.cdr.detectChanges();
    this.checkForChanges();
  }

  async updateProfile() {
    try {
      let photoURL = this.photoURL;
      let changesMade = false;

      if (this.selectedFile) {
        photoURL = await this.authService.uploadProfilePicture(
          this.selectedFile
        );
        changesMade = true;
      }

      if (
        this.displayName !== this.initialDisplayName ||
        photoURL !== this.initialPhotoURL
      ) {
        await this.authService.updateProfile(this.displayName, photoURL);
        this.cdr.detectChanges();
        this.snackbarService.callSnackbar('Profile updated successfully');
        this.router.navigate(['/profile']);
        changesMade = true;
      }

      if (!changesMade) {
        this.snackbarService.callSnackbar('No changes to update');
      }

      this.isChanged = false;
      this.initialDisplayName = this.displayName;
      this.initialPhotoURL = this.photoURL;
    } catch (error) {
      console.error('Update profile error', error);
      this.snackbarService.callSnackbar('Failed to update profile');
    }
  }

  onFieldChange() {
    this.checkForChanges();
  }

  checkForChanges() {
    this.isChanged =
      this.displayName !== this.initialDisplayName ||
      this.photoURL !== this.initialPhotoURL ||
      !!this.selectedFile;
  }
}
