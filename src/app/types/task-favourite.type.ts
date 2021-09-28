import { TaskI } from '../modules/auth-user/modules/pm/interfaces/task.interface';

export type TaskFavourite = Pick<TaskI, '_id' | 'title' | 'boardId' | 'number'>;
