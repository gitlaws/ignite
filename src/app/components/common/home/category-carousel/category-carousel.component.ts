import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.scss',
})
export class CategoryCarouselComponent implements OnInit {
  images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  currentIndex = 0;

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnInit() {
    this.lazyLoadImages();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('.carousel-image');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          observer.unobserve(img);
        }
      });
    });

    images.forEach((image) => observer.observe(image));
  }

  onImageLoad(index: number) {
    if (
      index === this.currentIndex &&
      this.currentIndex < this.images.length - 1
    ) {
      const nextImage = document.querySelectorAll('.carousel-image')[
        this.currentIndex + 1
      ] as HTMLImageElement;
      nextImage['src'] = nextImage.dataset.src!;
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.nextImage();
    } else if (event.key === 'ArrowLeft') {
      this.prevImage();
    }
  }
}
