export interface NotificationI {
  _id: string;
  createdAt: Date;
  isRead: boolean;
  text: string;
  type: string;
}
