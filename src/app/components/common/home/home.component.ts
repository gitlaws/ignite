import { Component } from '@angular/core';
import { ShopByProductsComponent } from './shop-by-products/shop-by-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShopByProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
