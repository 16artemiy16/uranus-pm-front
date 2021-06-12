import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BoardService } from '../../../../../../services/board.service';
import { ActivatedRoute } from '@angular/router';
import { ColumnI } from '../../interfaces/column.interface';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  columns: ColumnI[] = [];

  constructor(
    private readonly boardService: BoardService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params) => {
          return this.boardService.getBoardColumns(params.id);
        })
      )
      .subscribe((columns) => {
        this.columns = columns.sort((a, b) => a.order - b.order);
        this.changeDetectorRef.markForCheck();
      });
  }
}
