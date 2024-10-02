import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any = {}; // Replace with your user model

  constructor() {}

  getUser() {
    // Retrieve user data from persistent storage
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : this.user;
  }

  updateUserPhoto(photoURL: string) {
    this.user.photoURL = photoURL;
    // Save user data to persistent storage
    localStorage.setItem('user', JSON.stringify(this.user));
  }
}
