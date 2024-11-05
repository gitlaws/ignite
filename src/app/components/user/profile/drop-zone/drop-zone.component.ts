import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadService } from '../../../../services/file-upload.service';

@Component({
  selector: 'app-drop-zone',
  standalone: true,
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss'],
  imports: [CommonModule],
})
export class DropZoneComponent implements AfterViewInit {
  @Output() fileSelected = new EventEmitter<string>();
  selectedFileName: string | null = null;

  @ViewChild('dropZone') dropZone!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private fileUploadService: FileUploadService) {}

  ngAfterViewInit(): void {
    const dropZoneElement = this.dropZone.nativeElement;

    dropZoneElement.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
      dropZoneElement.classList.add('dragover');
    });

    dropZoneElement.addEventListener('dragleave', (event: DragEvent) => {
      event.preventDefault();
      dropZoneElement.classList.remove('dragover');
    });

    dropZoneElement.addEventListener('drop', (event: DragEvent) => {
      event.preventDefault();
      dropZoneElement.classList.remove('dragover');
      if (event.dataTransfer && event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        this.readFile(file);
      }
    });
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.readFile(input.files[0]);
    }
  }

  private readFile(file: File): void {
    this.selectedFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.fileUploadService.uploadFile(file, 'userId').then((url) => {
        this.fileSelected.emit(url);
      });
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.readFile(event.dataTransfer.files[0]);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const dropZoneElement = this.dropZone.nativeElement;
    dropZoneElement.classList.remove('dragover');
  }
}
