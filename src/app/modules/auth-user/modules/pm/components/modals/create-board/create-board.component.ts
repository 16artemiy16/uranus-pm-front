import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BoardService } from '../../../../../../../services/board.service';
import { SnackService } from '../../../../../../common/snack/snack.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent {
  readonly boardForm = this.fb.group({
    name: ['', Validators.required],
    description: ['']
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly boardService: BoardService,
    private readonly snack: SnackService
  ) { }

  create() {
    console.log(this.boardForm.getRawValue());
    this.boardService
      .create(this.boardForm.getRawValue())
      .subscribe((board) => {
        this.snack.success(`The board ${board.name} successfully created!`);
      });
  }
}
