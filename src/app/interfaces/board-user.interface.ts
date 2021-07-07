import { UserI } from './user.interface';
import { BoardUserRoleEnum } from '../enums/board-user-role.enum';
import { BoardUserStatusEnum } from '../enums/board-user-status.enum';

export interface BoardUserI extends UserI {
  role: BoardUserRoleEnum;
  status: BoardUserStatusEnum;
}

export interface BoardUserToInviteI {
  _id: string;
  email: string;
  img?: string;
}
