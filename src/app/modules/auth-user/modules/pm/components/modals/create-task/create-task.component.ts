import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from '../../../../../../../services/board.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsSandbox } from '../../../store/sandboxes/columns.sandbox';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTaskComponent {
  @Output() onCreate: EventEmitter<void> = new EventEmitter<void>();

  readonly taskForm = this.fb.group({
    title: ['', [Validators.required]],
    body: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardService: BoardService,
    private readonly columnsSandbox: ColumnsSandbox,
    @Inject(MAT_DIALOG_DATA) private readonly data: { boardId: string }
  ) {}

  create() {
    if (this.taskForm.valid) {
      const { title, body } = this.taskForm.getRawValue();
      const { boardId } = this.data;
      // TODO: refactor it, perform via store
      this.boardService.createTask(boardId, title, body).subscribe(a => {
        this.onCreate.emit();
        this.columnsSandbox.fetchColumns(boardId);
      });
    }
  }
}
