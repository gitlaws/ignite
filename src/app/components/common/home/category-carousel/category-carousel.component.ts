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
  categories = [
    {
      name: 'Category 1',
      image: 'https://source.unsplash.com/random/800x600?sig=1',
    },
    {
      name: 'Category 2',
      image: 'https://source.unsplash.com/random/800x600?sig=2',
    },
    {
      name: 'Category 3',
      image: 'https://source.unsplash.com/random/800x600?sig=3',
    },
    {
      name: 'Category 4',
      image: 'https://source.unsplash.com/random/800x600?sig=4',
    },
    {
      name: 'Category 5',
      image: 'https://source.unsplash.com/random/800x600?sig=5',
    },
    {
      name: 'Category 6',
      image: 'https://source.unsplash.com/random/800x600?sig=6',
    },
    {
      name: 'Category 7',
      image: 'https://source.unsplash.com/random/800x600?sig=7',
    },
    {
      name: 'Category 8',
      image: 'https://source.unsplash.com/random/800x600?sig=8',
    },
    {
      name: 'Category 9',
      image: 'https://source.unsplash.com/random/800x600?sig=9',
    },
  ];
  currentIndex = 0;
  autoplayInterval: any;

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  ngOnInit() {
    this.lazyLoadImages();
    this.startAutoplay();
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
    }, 3000);
  }

  stopAutoplay() {
    clearInterval(this.autoplayInterval);
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
