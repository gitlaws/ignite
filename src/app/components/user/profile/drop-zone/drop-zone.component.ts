import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
})
export class DropZoneComponent {
  @Output() fileSelected = new EventEmitter<File>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.fileSelected.emit(file);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileSelected.emit(file);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }
}
