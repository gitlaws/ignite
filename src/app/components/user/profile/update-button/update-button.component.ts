import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-button',
  standalone: true,
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss'],
})
export class UpdateButtonComponent {
  @Input() isChanged: boolean = false;
  @Output() updateProfile = new EventEmitter<void>();

  onUpdateProfile() {
    this.updateProfile.emit();
  }
}