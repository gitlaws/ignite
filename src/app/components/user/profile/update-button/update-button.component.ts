import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-button',
  standalone: true,
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
})
export class UpdateButtonComponent {
  @Input() user: any;
  @Input() tempDisplayName!: string;
  @Input() tempPhotoURL!: string;
  @Input() disabled: boolean = true;
  @Output() updateProfile = new EventEmitter<void>();

  onUpdateProfile() {
    if (this.disabled) {
      alert('Please enter a display name or photo URL to update.');
      return;
    }

    if (this.tempDisplayName.trim() !== '') {
      this.user.displayName = this.tempDisplayName;
    }

    if (this.tempPhotoURL.trim() !== '') {
      this.user.photoURL = this.tempPhotoURL;
    }

    // Emit the event to notify the parent component
    this.updateProfile.emit();
    console.log('Profile updated:', this.user);
  }
}
