import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrls: ['./category-carousel.component.scss'],
})
export class CategoryCarouselComponent implements OnInit {
  @Input() categories: { name: string; image: string }[] = [];
  @Input() options: {
    autoplay?: boolean;
    interval?: number;
    pagination?: boolean;
  } = {};
  @Output() categorySelected = new EventEmitter<string>();

  currentIndex = 0;
  autoplayInterval: any;

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnInit() {
    this.lazyLoadImages();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
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
      this.currentIndex < this.categories.length - 1
    ) {
      const nextImage = document.querySelectorAll('.carousel-image')[
        this.currentIndex + 1
      ] as HTMLImageElement;
      if (nextImage.dataset.src) {
        nextImage.src = nextImage.dataset.src;
      }
    }
  }

  nextImage() {
    if (this.currentIndex < this.categories.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.categories.length - 1;
    }
  }

  goToImage(index: number) {
    this.currentIndex = index;
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => {
      this.nextImage();
    }, this.options.interval || 3000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
  }

  selectCategory(category: string) {
    this.categorySelected.emit(category);
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