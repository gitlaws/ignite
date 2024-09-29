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
})
export class DropZoneComponent implements AfterViewInit {
  @Output() fileSelected = new EventEmitter<string>();
  selectedFileName: string | null = null;

  @ViewChild('dropZone') dropZone!: ElementRef;

  ngAfterViewInit() {
    const dropZoneElement = this.dropZone.nativeElement;

    dropZoneElement.addEventListener('dragover', (event: DragEvent) => {
      event.preventDefault();
      dropZoneElement.classList.add('dragover');
    });

    dropZoneElement.addEventListener('dragleave', () => {
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

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.readFile(file);
    }
  }

  private readFile(file: File) {
    this.selectedFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.fileSelected.emit(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.readFile(file);
    }
  }

  onDragLeave(event: DragEvent) {
    const dropZoneElement = this.dropZone.nativeElement;
    dropZoneElement.classList.remove('dragover');
  }
}
