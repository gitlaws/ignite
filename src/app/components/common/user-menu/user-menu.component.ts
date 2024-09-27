import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit {
  isLoggedIn: boolean = true; // Example value, replace with actual logic
  isMenuOpen: boolean = false; // Add this property
  user: any = {}; // Assuming you have a user object
  private closeMenuTimeout: any;
  menuItems: Array<{ name: string; url: string }> = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user; // Set isLoggedIn based on user presence
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
    }, 300); // Adjust the delay as needed
  }

  openLink(event: MouseEvent, url: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.open(url, '_blank', 'noopener'); // Open link in a new tab
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
