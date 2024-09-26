import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-button',
  standalone: true,
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
})
export class UpdateButtonComponent {
  @Input() user: any;
  @Input()
  tempDisplayName!: string;
  @Input() tempPhotoURL!: string;
  @Output() updateProfile = new EventEmitter<void>();

  onUpdateProfile() {
    if (this.tempDisplayName.trim() === '') {
      alert('Display name is required');
      return;
    }
    if (this.tempPhotoURL.trim() === '') {
      alert('Photo URL is required');
      return;
    }
    this.user.displayName = this.tempDisplayName;
    this.user.photoURL = this.tempPhotoURL;
    // Emit the event to notify the parent component
    this.updateProfile.emit();
    console.log('Profile updated:', this.user);
  }
}
