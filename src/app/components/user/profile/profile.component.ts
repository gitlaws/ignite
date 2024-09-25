import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName!: string;
  photoURL!: string;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
        if (!user.emailVerified) {
          alert('Please verify your email to access your profile.');
        }
      } else {
        this.router.navigate(['/login']); // Redirect to login if no user
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photoURL = e.target.result;
        this.cdr.detectChanges(); // Trigger change detection to update the view
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      this.authService
        .uploadProfilePicture(this.selectedFile)
        .then((url) => {
          this.photoURL = url;
          this.updateProfile();
          this.cdr.detectChanges(); // Manually trigger change detection
        })
        .catch((error) => {
          console.error('Upload profile picture error', error);
        });
    }
  }

  updateProfile() {
    this.authService
      .updateProfile(this.displayName, this.photoURL)
      .then(() => {
        if (this.user) {
          this.user = {
            ...this.user,
            displayName: this.displayName,
            photoURL: this.photoURL,
          };
          this.cdr.detectChanges(); // Manually trigger change detection
        }
      })
      .catch((error) => {
        console.error('Update profile error', error);
      });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
