import { Component, Input } from '@angular/core';
import { BoardI } from '../../../../interfaces/board.interface';
import { BoardsSandbox } from '../../store/boards.sandbox';

@Component({
  selector: 'app-boards-grid-view',
  templateUrl: './boards-grid-view.component.html',
  styleUrls: ['./boards-grid-view.component.scss']
})
export class BoardsGridViewComponent {
  @Input() boards: BoardI[] = [];

  constructor(
    private readonly boardsSandbox: BoardsSandbox
  ) { }

  toggleFavouriteBoard(boardId: string) {
    this.boardsSandbox.toggleFavouriteBoard(boardId);
  }
}
