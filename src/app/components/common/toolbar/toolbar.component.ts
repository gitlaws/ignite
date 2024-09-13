import { Component } from '@angular/core';
import { CubeLogoComponent } from './cube-logo/cube-logo.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { IgniteLogoComponent } from './ignite-logo/ignite-logo.component';
import { DroneLogoComponent } from './drone-logo/drone-logo.component';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CubeLogoComponent,
    MobileMenuComponent,
    IgniteLogoComponent,
    DroneLogoComponent,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {}
