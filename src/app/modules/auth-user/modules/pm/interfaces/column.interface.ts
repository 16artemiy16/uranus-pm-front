import { TaskI } from './task.interface';

export interface ColumnI {
  _id: string;
  name: string;
  order: number;
  tasks: TaskI[];
}
