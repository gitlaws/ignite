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

  @ViewChild('profilePictureInput') profilePictureInput!: ElementRef;

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
        console.error('User is null');
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
          this.photoURL = e.target.result;
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

  async updateProfile() {
    try {
      let photoURL = this.user?.photoURL || '';
      if (this.selectedFile) {
        photoURL = await this.authService.uploadProfilePicture(
          this.selectedFile
        );
      }

      await this.authService.updateProfile(this.displayName, photoURL);
      this.cdr.detectChanges();
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Update profile error', error);
    }
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
