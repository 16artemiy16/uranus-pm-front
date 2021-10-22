export interface TaskI {
  _id: string;
  number: number;
  title: string;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
  body?: string;
  assignee?: string | null;
}
