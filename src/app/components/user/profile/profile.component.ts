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
import { SnackbarComponent } from '../../common/snackbar/snackbar.component'; // Import SnackbarService

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterModule,
    SnackbarComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName: string = '';
  photoURL: string | null = '';
  selectedFile: File | null = null;

  initialDisplayName: string = '';
  initialPhotoURL: string | null = '';

  @ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackbarService: SnackbarService // Inject SnackbarService
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

  triggerFileInput(): void {
    this.profilePictureInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result !== undefined) {
          this.photoURL = e.target.result as string;
          this.cdr.detectChanges();
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (e.target.result !== undefined) {
          this.photoURL = e.target.result;
          this.cdr.detectChanges();
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removePhoto(): void {
    this.photoURL = null;
    this.selectedFile = null;
    this.cdr.detectChanges();
  }

  async updateProfile() {
    try {
      let photoURL = this.photoURL; // Use the current photoURL
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
        this.snackbarService.callSnackbar('Profile updated successfully'); // Show snackbar
        this.router.navigate(['/profile']);
        changesMade = true;
      }

      if (!changesMade) {
        this.snackbarService.callSnackbar('No changes to update');
      }
    } catch (error) {
      console.error('Update profile error', error);
      this.snackbarService.callSnackbar('Failed to update profile'); // Show error snackbar
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
