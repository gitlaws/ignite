import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SnackbarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  @Input() public message = '';
  public isShown = false;

  constructor(public snackbarService: SnackbarService) {}

  public ngOnInit(): void {
    this.snackbarService.snackbar$.subscribe((value) => {
      this.showMessage(value);
    });
  }

  public showMessage(message: string): void {
    this.isShown = true;
    this.message = message;

    const subscription = of(null)
      .pipe(delay(2900))
      .subscribe({
        complete: () => {
          this.isShown = false;
          subscription.unsubscribe();
        },
      });
  }
}
