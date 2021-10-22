import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(
    private readonly matSnack: MatSnackBar
  ) { }

  open(msg: string, cls: string = '') {
    this.matSnack.open(msg, '', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['snackbar', cls]
    });
  }

  success(msg: string) {
    this.open(msg, 'snackbar-success');
  }

  warning(msg: string) {
    this.open(msg, 'snackbar-warning');
  }

  error(msg: string) {
    this.open(msg, 'snackbar-error');
  }
}
