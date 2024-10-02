import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User as FirebaseUser } from '@firebase/auth';
import { User as AppUser } from '../../../models/user.models';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  isLoggedIn: boolean = true;
  isMenuOpen: boolean = false;
  user: AppUser = { displayName: '', photoURL: '' };
  tempPhotoURL: string = '';
  private closeMenuTimeout: any;
  menuItems: Array<{ name: string; url: string }> = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .getUser()
      .subscribe((firebaseUser: FirebaseUser | null) => {
        const appUser = this.transformFirebaseUser(firebaseUser);
        this.user = appUser ?? { displayName: '', photoURL: '' };
        this.isLoggedIn = !!appUser;
        this.updateMenuItems();
      });
  }

  private transformFirebaseUser(
    firebaseUser: FirebaseUser | null
  ): AppUser | null {
    if (!firebaseUser) {
      return null;
    }
    return {
      displayName: firebaseUser.displayName ?? '',
      photoURL: firebaseUser.photoURL ?? '',
      // map other properties...
    };
  }

  onMouseEnter() {
    if (this.closeMenuTimeout) {
      clearTimeout(this.closeMenuTimeout);
    }
    this.isMenuOpen = true;
  }

  onMouseLeave() {
    this.closeMenuTimeout = setTimeout(() => {
      this.isMenuOpen = false;
    }, 300);
  }

  openLink(event: MouseEvent, url: string): void {
    event.preventDefault();
    window.open(url, '_blank', 'noopener');
  }

  toggleMenu(event: Event): void {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.updateMenuItems();
      this.router.navigate(['/login']);
    });
  }

  navigateToProfile() {
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  private updateMenuItems() {
    if (this.isLoggedIn) {
      this.menuItems = [
        { name: 'Profile', url: '/profile' },
        { name: 'Logout', url: '/logout' },
      ];
    } else {
      this.menuItems = [
        { name: 'Login', url: '/login' },
        { name: 'Register', url: '/register' },
      ];
    }
  }
}
