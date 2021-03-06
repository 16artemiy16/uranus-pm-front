import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from '@services/board.service';
import { BoardKeyValidator } from './validators/board-key.validator';
import { TranslocoService } from '@ngneat/transloco';
import { BoardsSandbox } from '../../store/boards.sandbox';

// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
  // TODO: think about an Angular issue. invalid and pending + onPush not working
  // changeDetection: ChangeDetectionStrategy.OnPush
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
