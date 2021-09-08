import { Component, Input } from '@angular/core';
import { BoardI } from '../../../../interfaces/board.interface';

@Component({
  selector: 'app-boards-list-view',
  templateUrl: './boards-list-view.component.html',
  styleUrls: ['./boards-list-view.component.scss']
})
export class BoardsListViewComponent {
  readonly DISPLAYED_COLUMNS = ['favourite', 'name', 'key', 'owner', 'actions'];

  @Input() boards: BoardI[] = [];

  constructor() { }
}
