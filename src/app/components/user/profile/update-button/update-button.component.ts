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
  @Output() updateProfile = new EventEmitter<void>();

  updateDisplayName() {
    if (this.tempDisplayName.trim() === '') {
      alert('Display name is required');
      return;
    }
    this.user.displayName = this.tempDisplayName;
    // Emit the event to notify the parent component
    this.updateProfile.emit();
    console.log('Display name updated:', this.user.displayName);
  }
}
