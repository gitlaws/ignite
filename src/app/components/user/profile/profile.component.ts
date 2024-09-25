import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators'; // Import 'map' from 'rxjs/operators'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, of } from 'rxjs'; // Import 'of' from 'rxjs'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName!: string;
  photoURL!: string;
  uploadPercent: Observable<number> = of(0); // Initialize with an empty observable
  downloadURL: Observable<string> = of(''); // Initialize with an empty observable

  constructor(
    private authService: AuthService,
    private storage: AngularFireStorage,
    private router: Router
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

  uploadFile(event: any) {
    const file = event.target.files[0];
    const uid = this.authService.getCurrentUserUid();
    if (uid) {
      const filePath = `profile_pictures/${uid}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      this.uploadPercent = task.percentageChanges().pipe(
        map((percentage) => percentage ?? 0) // Transform 'undefined' to '0'
      );
      task
        .snapshotChanges()
        .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
        .subscribe();
    } else {
      console.error('No user is currently logged in');
    }
  }

  updateProfile() {
    this.authService
      .updateProfile(this.displayName, this.photoURL)
      .then(() => {
        if (this.user) {
          // Create a new user object with updated properties
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
