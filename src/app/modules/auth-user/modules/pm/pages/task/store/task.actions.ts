import { createAction, props } from '@ngrx/store';
import { TaskI } from '../../../interfaces/task.interface';
import { BoardUserI } from '../../../../../../../interfaces/board-user.interface';

export const fetchTask = createAction('[Task] Fetch Task', props<{ id: string }>());
export const fetchTaskSuccess = createAction('[Task] Fetch Task Success', props<{ task: TaskI }>());

export const fetchUsers = createAction('[Task] Fetch Users', props<{ boardId: string }>());
export const fetchUsersSuccess = createAction('[Task] Fetch Users Success', props<{ users: BoardUserI[] }>());

export const assign = createAction('[Task] Assign', props<{ userId: string | null }>());
