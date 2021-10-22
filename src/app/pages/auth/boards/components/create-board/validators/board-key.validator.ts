import { BoardService } from '../../../../../../services/board.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export class BoardKeyValidator {
  static createValidator(boardService: BoardService, debounceMS: number = 500): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(debounceMS).pipe(
        switchMap(() => {
          return boardService.isKeyFree(control.value);
        }),
        map((isValid) => isValid ? null : { keyOccupied: true })
      );
    }
  }
}
