import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BoardI } from '@layouts/auth/interfaces/board.interface';
import { BoardsSandbox } from '../../store/boards.sandbox';

@Component({
  selector: 'app-boards-list-view',
  templateUrl: './boards-list-view.component.html',
  styleUrls: ['./boards-list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsListViewComponent {
  readonly DISPLAYED_COLUMNS = ['favourite', 'name', 'key', 'owner', 'actions'];

  @Input() boards: BoardI[] = [];

  constructor(
    private readonly boardsSandbox: BoardsSandbox
  ) { }

  toggleFavouriteBoard(boardId: string) {
    this.boardsSandbox.toggleFavouriteBoard(boardId);
  }
}
