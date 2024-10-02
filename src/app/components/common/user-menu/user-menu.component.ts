import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { User } from '../../../models/user.models';

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
  user: User = { photoURL: '' };
  tempPhotoURL: string = '';
  private closeMenuTimeout: any;
  menuItems: Array<{ name: string; url: string }> = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user: User | null) => {
      this.user = user ?? { photoURL: '' };
      this.isLoggedIn = !!user;
      this.updateMenuItems();
    });
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
