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
      this.user = user;
      this.displayName = user?.displayName || '';
      this.photoURL = user?.photoURL || '';
      if (user && !user.emailVerified) {
        alert('Please verify your email to access your profile.');
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
