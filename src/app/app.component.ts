import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/common/toolbar/toolbar.component';
import { TopOfPageCartComponent } from './components/common/top-of-page-cart/top-of-page-cart.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/common/home/home.component';
import { SnackbarComponent } from './components/common/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    TopOfPageCartComponent,
    RegisterComponent,
    HomeComponent,
    SnackbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ignite';
}
