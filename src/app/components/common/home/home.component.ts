import { Component } from '@angular/core';
import { ShopByCategoryComponent } from './shop-by-category/shop-by-category.component';
import { CategoryCarouselComponent } from './category-carousel/category-carousel.component';
import { RegisterComponent } from '../../auth/register/register.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ShopByCategoryComponent,
    CategoryCarouselComponent,
    RegisterComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
