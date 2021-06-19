import { createAction, props } from '@ngrx/store';
import { ColumnI } from '../../interfaces/column.interface';

export const fetchColumns = createAction('[Columns] Fetch Columns', props<{ boardId: string }>());
export const fetchColumnsSuccess = createAction(
  '[Columns] Fetch Columns Success',
  props<{ columns: ColumnI[] }>()
);

export const moveTask = createAction(
  '[Columns] Move Task',
  props<{ taskId: string, toIndex: number, columnId?: string }>()
);

export const moveTaskError = createAction(
  '[Columns] Move Task Error',
  props<{ taskId: string, toIndex: number, columnId?: string }>()
)
