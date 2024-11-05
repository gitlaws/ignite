import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authenticated = false;
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
    const errorMessages: { [key: string]: string } = {
      'auth/invalid-email': 'The email address is not valid.',
      'auth/user-disabled': 'The user account has been disabled.',
      'auth/user-not-found':
        'There is no user corresponding to the given email.',
      'auth/wrong-password': 'The password is invalid.',
      'auth/too-many-requests':
        'Too many login attempts. Please try again later.',
    };

    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.authenticated = true;
        this.snackbarService.callSnackbar('Logged in successfully');
      })
      .catch((error) => {
        const customMessage =
          errorMessages[error.code] || 'Login failed: ' + error.message;
        this.snackbarService.callSnackbar(customMessage);
        throw error;
      });
  }

  logout(): Promise<void> {
    return signOut(this.auth).then(() => {
      this.authenticated = false;
      this.snackbarService.callSnackbar('You have been logged out');
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUser(): Observable<User | null> {
    return this.user$;
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }
}
