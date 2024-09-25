import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar.service';
import { SnackbarComponent } from '../../common/snackbar/snackbar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    SnackbarComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  profileForm: FormGroup;
  selectedFile: File | null = null;

  initialDisplayName: string = '';
  initialPhotoURL: string | null = '';

  @ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.profileForm = this.fb.group({
      displayName: [''],
      photoURL: [''],
    });
  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.profileForm.patchValue({
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
        });
        this.initialDisplayName = user.displayName || '';
        this.initialPhotoURL = user.photoURL || '';
      }
    });
  }

  triggerFileInput(): void {
    this.renderer
      .selectRootElement(this.profilePictureInput.nativeElement)
      .click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.readFile(this.selectedFile);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      this.readFile(this.selectedFile);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removePhoto(): void {
    this.profileForm.patchValue({ photoURL: null });
    this.selectedFile = null;
    this.cdr.markForCheck();
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result !== undefined) {
        this.profileForm.patchValue({ photoURL: e.target.result as string });
        this.cdr.markForCheck();
      }
    };
    reader.readAsDataURL(file);
  }

  async updateProfile() {
    try {
      let photoURL = this.profileForm.value.photoURL;
      let changesMade = false;

      if (this.selectedFile) {
        photoURL = await this.authService.uploadProfilePicture(
          this.selectedFile
        );
        changesMade = true;
      }

      if (
        this.profileForm.value.displayName !== this.initialDisplayName ||
        photoURL !== this.initialPhotoURL
      ) {
        await this.authService.updateProfile(
          this.profileForm.value.displayName,
          photoURL
        );
        this.cdr.markForCheck();
        this.snackbarService.callSnackbar('Profile updated successfully');
        this.router.navigate(['/profile']);
        changesMade = true;
      }

      if (!changesMade) {
        this.snackbarService.callSnackbar('No changes to update');
      }
    } catch (error) {
      console.error('Update profile error', error);
      this.snackbarService.callSnackbar('Failed to update profile');
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
