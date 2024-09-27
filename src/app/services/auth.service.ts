import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User,
} from '@angular/fire/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
  private storage = getStorage();
  user$: Observable<User | null>;

  constructor(private auth: Auth, private snackbarService: SnackbarService) {
    this.auth.setPersistence(browserLocalPersistence);
    this.user$ = authState(this.auth);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        return sendEmailVerification(userCredential.user).then(() => {
          this.authenticated = true;
        });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.authenticated = true;
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  async getUserProfile(): Promise<{
    [x: string]: any;
    displayName: string;
    photoURL: string;
  }> {
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

  async onUpdateProfile(
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

  uploadProfilePicture(file: File): Promise<string> {
    const user = this.auth.currentUser;
    if (!user) {
      return Promise.reject('No user is currently logged in');
    }

    const storageRef = ref(this.storage, `profile_pictures/${user.uid}`);
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);
    });
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.authenticated = false;
    this.snackbarService.callSnackbar('You have been logged out');
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
