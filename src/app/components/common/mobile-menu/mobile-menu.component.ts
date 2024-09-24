import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service'; // Adjust the path as necessary

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  isMenuOpen = false;
  isLoggedIn = false;
  menuItems = [
    { name: 'Login', url: '/login' },
    { name: 'Register', url: '/register' },
  ];

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    document.addEventListener('click', this.documentClickHandler.bind(this));
    this.authService.getUser().subscribe((user) => {
      this.isLoggedIn = !!user;
      this.updateMenuItems();
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickHandler.bind(this));
  }

  documentClickHandler(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }

  openLink(event: MouseEvent, url: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.open(url, '_blank', 'noopener'); // Open link in a new tab
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.updateMenuItems();
      this.router.navigate(['/home']);
    });
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
