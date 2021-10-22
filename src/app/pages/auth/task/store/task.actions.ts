import { createAction, props } from '@ngrx/store';
import { TaskI } from '../../../../layouts/auth/interfaces/task.interface';
import { BoardUserI } from '../../../../shared/models/interfaces/board-user.interface';
import { LastBoardI } from '../../../../layouts/auth/interfaces/last-boards.interface';

export const fetchTask = createAction('[Task] Fetch Task', props<{ id: string }>());
export const fetchTaskSuccess = createAction('[Task] Fetch Task Success', props<{ task: TaskI }>());

export const fetchUsers = createAction('[Task] Fetch Users', props<{ boardId: string }>());
export const fetchUsersSuccess = createAction('[Task] Fetch Users Success', props<{ users: BoardUserI[] }>());

export const assign = createAction('[Task] Assign', props<{ userId: string | null }>());

export const fetchBoardInfo = createAction('[Task] Fetch Board Info', props<{ boardId: string }>());
export const fetchBoardInfoSuccess = createAction('[Task] Fetch Board Info Success', props<{ board: LastBoardI }>())
