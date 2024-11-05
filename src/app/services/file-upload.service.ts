// src/app/services/file-upload.service.ts
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private storageService: StorageService) {}

  uploadFile(file: File, userId: string): Promise<string> {
    return this.storageService.uploadProfilePicture(file, userId);
  }
}
