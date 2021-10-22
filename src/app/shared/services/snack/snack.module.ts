import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackService } from './snack.service';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ],
  providers: [SnackService],
})
export class SnackModule { }
