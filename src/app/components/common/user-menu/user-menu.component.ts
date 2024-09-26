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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      this.isLoggedIn = !!user; // Set isLoggedIn based on user presence
    });
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