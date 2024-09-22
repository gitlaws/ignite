import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  getUser(): Observable<User | null> {
    return this.afAuth.authState as Observable<User | null>;
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    return this.afAuth.currentUser.then((user) => {
      if (user) {
        return user.updateProfile({ displayName, photoURL });
      } else {
        return Promise.reject('No user is currently logged in');
      }
    });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
