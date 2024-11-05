import { Injectable } from '@angular/core';
import { Auth, updateProfile, User } from '@angular/fire/auth';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private auth: Auth, private snackbarService: SnackbarService) {}

  async getUserProfile(): Promise<{ displayName: string; photoURL: string }> {
    const user = this.auth.currentUser;
    if (user) {
      return {
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      };
    } else {
      throw new Error('No user is currently signed in');
    }
  }

  async updateProfile(
    displayName: string,
    photoURL: string | null
  ): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      await updateProfile(user, { displayName, photoURL });
      this.snackbarService.callSnackbar('Profile updated successfully');
    } else {
      throw new Error('No user is currently signed in');
    }
  }
}
