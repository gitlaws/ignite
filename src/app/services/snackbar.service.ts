// src/app/services/snackbar/snackbar.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbarSubject = new Subject<string>();
  public snackbar$ = this.snackbarSubject.asObservable();

  public show(message: string): void {
    this.snackbarSubject.next(message);
  }
}
