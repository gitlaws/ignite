import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-drone-logo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './drone-logo.component.html',
  styleUrl: './drone-logo.component.scss',
})
export class DroneLogoComponent {}
