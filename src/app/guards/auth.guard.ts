import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.getUser().pipe(
      map((user) => {
        if (user) {
          this.router.navigate(['/profile']);
          return false;
        }
        return true;
      })
    );
  }
}
