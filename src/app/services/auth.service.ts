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
import { SnackbarService } from './snackbar.service'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) {}

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        return sendEmailVerification(userCredential.user);
      }
    );
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
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
      this.snackbarService.callSnackbar('You have been logged out'); // Show snackbar message
    });
  }

  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(this.auth, email); // Use this.auth instead of this.afAuth
  }
}
