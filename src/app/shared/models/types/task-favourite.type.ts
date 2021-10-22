import { TaskI } from '../../../layouts/auth/interfaces/task.interface';

export type TaskFavourite = Pick<TaskI, '_id' | 'title' | 'boardId' | 'number'>;
