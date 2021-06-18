import { Component } from '@angular/core';
import { BoardService } from '../../../../../../services/board.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBoardComponent } from '../../components/modals/create-board/create-board.component';
import { BoardI } from '../../interfaces/board.interface';
import { Observable } from 'rxjs';
import { BoardsSandbox } from '../../store/sandboxes/boards.sandbox';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss']
})
export class BoardsPageComponent {
  boards$: Observable<BoardI[]> = this.boardsSandbox.boards$;

  constructor(
    private readonly boardService: BoardService,
    private readonly dialog: MatDialog,
    private readonly boardsSandbox: BoardsSandbox
  ) {
    this.boardsSandbox.fetchBoards();
  }

  createBoard() {
    this.dialog.open(CreateBoardComponent, {
      width: '600px'
    });
  }
}
