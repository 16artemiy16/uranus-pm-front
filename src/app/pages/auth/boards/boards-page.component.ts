import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardService } from '@services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from './components/create-board/create-board.component';
import { BoardI } from '@layouts/auth/interfaces/board.interface';
import { Observable } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Title } from '@angular/platform-browser';
import { BoardsSandbox } from './store/boards.sandbox';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsPageComponent {
  boards$: Observable<BoardI[]> = this.boardsSandbox.boards$;
  view: 'grid' | 'list' = this.boardsSandbox.cachedBoardsView;

  constructor(
    private readonly boardService: BoardService,
    private readonly dialog: MatDialog,
    private readonly boardsSandbox: BoardsSandbox,
    private readonly title: Title
  ) {
    this.boardsSandbox.fetchBoards();
    this.title.setTitle('Boards');
  }

  createBoard() {
    this.dialog.open(CreateBoardComponent, {
      width: '600px'
    });
  }

  changeView({ value }: MatButtonToggleChange) {
    this.view = value;
    this.boardsSandbox.cacheBoardsView(value);
  }
}
