import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  // theme!: 'light' | 'dark';
  isMenuOpen = false;
  menuItems = [
    { name: 'Login', url: '/login' },
    { name: 'Register', url: '/register' },
  ];

  openLink(event: MouseEvent, url: string): void {
    event.preventDefault(); // Prevent default anchor behavior
    window.open(url, '_blank', 'noopener'); // Open link in a new tab
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Add a click event listener to the document
    document.addEventListener('click', this.documentClickHandler.bind(this));
  }

  ngOnDestroy(): void {
    // Remove the click event listener from the document
    document.removeEventListener('click', this.documentClickHandler.bind(this));
  }

  documentClickHandler(event: MouseEvent) {
    // Check if the click event is coming from within the dropdown content
    if (!this.elementRef.nativeElement.contains(event.target)) {
      // If not, close the dropdown
      this.isMenuOpen = false;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
  }
}
