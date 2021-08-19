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
);

export const setTaskFilterText = createAction(
  '[Columns] Set Task Filter Text',
  props<{ text: string }>()
);

export const setActiveTaskId = createAction(
  '[Columns] Set Active Task',
  props<{ taskId: string | null }>()
);

export const assignTask = createAction(
  '[Columns] Assign Task',
  props<{ taskId: string, userId: string | null }>()
);

export const assignTaskSuccess = createAction(
  '[Columns] Assign Task Success'
);

export const assignActiveTask = createAction(
  '[Columns] Assign Active Task',
  props<{ userId: string | null }>()
)
