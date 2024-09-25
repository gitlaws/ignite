import { Injectable } from '@angular/core';
import {
  User,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  authState,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;

  constructor(private auth: Auth, private snackbarService: SnackbarService) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        return sendEmailVerification(userCredential.user).then(() => {
          this.authenticated = true; // Set authenticated to true after email verification
        });
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password).then(() => {
      this.authenticated = true; // Set authenticated to true after login
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUser(): Observable<User | null> {
    return authState(this.auth);
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    const user = this.auth.currentUser;
    if (user) {
      return updateProfile(user, { displayName, photoURL });
    } else {
      return Promise.reject('No user is currently logged in');
    }
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.authenticated = false; // Set authenticated to false after logout
      this.snackbarService.callSnackbar('You have been logged out');
    });
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
