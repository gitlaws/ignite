import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = getStorage();

  uploadProfilePicture(file: File, userId: string): Promise<string> {
    const storageRef = ref(this.storage, `profile_pictures/${userId}`);
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);
    });
  }
}
