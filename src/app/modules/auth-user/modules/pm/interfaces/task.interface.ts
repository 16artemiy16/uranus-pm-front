export interface TaskI {
  _id: string;
  title: string;
  boardId: string;
  createdAt: Date,
  updatedAt: Date,
  body?: string;
}
