import { Component } from '@angular/core';
import { CubeLogoComponent } from './cube-logo/cube-logo.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CubeLogoComponent, MobileMenuComponent],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
