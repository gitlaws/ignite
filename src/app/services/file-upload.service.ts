import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  uploadFile(file: File, userId: string): Promise<string> {
    // Logic to upload the file and return the URL
    return new Promise((resolve, reject) => {
      // Simulate file upload
      setTimeout(() => {
        resolve('https://example.com/uploaded-file-url');
      }, 1000);
    });
  }
}
