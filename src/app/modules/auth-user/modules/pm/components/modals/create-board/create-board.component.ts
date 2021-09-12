import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardsSandbox } from '../../../store/sandboxes/boards.sandbox';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent {
  readonly boardForm = this.fb.group({
    name: ['', Validators.required],
    key: ['', Validators.required],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardsSandbox: BoardsSandbox
  ) { }

  create() {
    this.boardsSandbox.createBoard(this.boardForm.getRawValue());
  }
}
