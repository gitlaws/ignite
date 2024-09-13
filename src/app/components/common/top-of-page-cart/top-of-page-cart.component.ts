import { Component, HostListener } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-top-of-page-cart',
  standalone: true,
  imports: [],
  templateUrl: './top-of-page-cart.component.html',
  styleUrl: './top-of-page-cart.component.scss',
})
export class TopOfPageCartComponent {
  public isShown = true;

  constructor(private viewportScroller: ViewportScroller) {}

  // @HostListener('window:scroll') onWindowScroll() {
  //   const yCoordinate = this.viewportScroller.getScrollPosition()[1];
  //   this.isShown = yCoordinate > 400;
  // }

  public goToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  public itemCount = 0;

  // Method to update the item count
  public updateItemCount(count: number): void {
    this.itemCount = count;
  }
}
