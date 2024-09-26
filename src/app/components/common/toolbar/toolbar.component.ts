import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CubeLogoComponent } from './cube-logo/cube-logo.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { IgniteLogoComponent } from './ignite-logo/ignite-logo.component';
import { DroneLogoComponent } from './drone-logo/drone-logo.component';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CubeLogoComponent,
    MobileMenuComponent,
    IgniteLogoComponent,
    DroneLogoComponent,
    RouterLink,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.isLoggedIn = !!user;
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.user = {};
      this.router.navigate(['/login']);
    });
  }
}
