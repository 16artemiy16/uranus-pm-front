import { Component, Input } from '@angular/core';
import { BoardI } from '../../../../interfaces/board.interface';
import { BoardsSandbox } from '../../store/boards.sandbox';

@Component({
  selector: 'app-board-favourite-btn',
  template: `
    <button *ngIf="board" mat-icon-button (click)="toggleFavouriteBoard(board._id)">
      <mat-icon class="fav-icon" [class.active]="board.isFavourite">star_rate</mat-icon>
    </button>
  `,
  styleUrls: ['./board-favourite-btn.component.scss']
})
export class BoardFavouriteBtnComponent {
  @Input() board: BoardI | undefined;

  constructor(
    private readonly boardsSandbox: BoardsSandbox
  ) { }

  toggleFavouriteBoard(boardId: string) {
    this.boardsSandbox.toggleFavouriteBoard(boardId);
  }
}
