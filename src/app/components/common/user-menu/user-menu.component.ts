import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user; // Set isLoggedIn based on user presence
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
      this.user = {};
      this.isLoggedIn = false; // Update isLoggedIn on logout
    });
  }
}
