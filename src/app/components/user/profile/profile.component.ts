import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'firebase/auth';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterModule, Router } from '@angular/router';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  displayName: string = '';
  photoURL: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
        this.displayName = user.displayName || '';
        this.photoURL = user.photoURL || '';
      } else {
        // Handle the case where user is null
        console.error('User is null');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result !== undefined) {
          this.photoURL = e.target.result;
          this.cdr.detectChanges(); // Trigger change detection to update the view
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
          this.cdr.detectChanges(); // Trigger change detection to update the view
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async updateProfile() {
    try {
      let photoURL = this.user?.photoURL || '';
      if (this.selectedFile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile_pictures/${this.user?.uid}`);
        await uploadBytes(storageRef, this.selectedFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await this.authService.updateProfile(this.displayName, photoURL);
      this.cdr.detectChanges(); // Trigger change detection to update the view
      this.router.navigate(['/profile']); // Redirect to profile page
    } catch (error) {
      console.error('Update profile error', error);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
