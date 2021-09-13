import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardsSandbox } from '../../../store/sandboxes/boards.sandbox';
import { BoardService } from '../../../../../../../services/board.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { BoardKeyValidator } from './validators/board-key.validator';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent {
  readonly boardForm = this.fb.group({
    name: ['', Validators.required],
    key: ['', Validators.required, BoardKeyValidator.createValidator(this.boardsService, 500)],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardsSandbox: BoardsSandbox,
    private readonly boardsService: BoardService,
    private readonly transloco: TranslocoService
  ) {}

  get keyOccupiedError(): string | null {
    const keyControl = this.boardForm!.get('key');
    return keyControl!.hasError('keyOccupied')
      ? this.transloco.translate('auth.boardModal.KeyOccupied', { key: keyControl?.value })
      : null;
  }

  create() {
    this.boardsSandbox.createBoard(this.boardForm.getRawValue());
  }
}
