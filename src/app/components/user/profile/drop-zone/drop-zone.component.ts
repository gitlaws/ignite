import { CommonModule } from '@angular/common';
import {
  Component,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
  imports: [CommonModule],
})
export class DropZoneComponent implements AfterViewInit {
  @Output() fileSelected = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput!: ElementRef;

  selectedFileName: string | null = null;

  ngAfterViewInit(): void {
    // Additional initialization if needed
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Add dragover class to the drop zone
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Remove dragover class from the drop zone
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    this.selectedFileName = file.name;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const fileDataUrl = e.target.result;
      this.fileSelected.emit(fileDataUrl);
    };
    reader.readAsDataURL(file);
  }
}
