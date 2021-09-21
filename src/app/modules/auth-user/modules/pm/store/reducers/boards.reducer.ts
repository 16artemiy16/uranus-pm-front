import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BoardI } from '../../interfaces/board.interface';
import {
  fetchBoardMembersSuccess,
  fetchBoardsSuccess,
  setSelectedBoardId,
  inviteUsers,
  toggleFavouriteBoard
} from '../actions/boards.actions';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
import { BoardUserStatusEnum } from '../../../../../../enums/board-user-status.enum';
import { BoardUserRoleEnum } from '../../../../../../enums/board-user-role.enum';

export interface BoardsStateI extends EntityState<BoardI>{
  selectedBoardId: string | null;
  users: BoardUserI[];
}

export const adapterBoards: EntityAdapter<BoardI> = createEntityAdapter<BoardI>({
  selectId: (model) => model._id
});

const initialState: BoardsStateI = adapterBoards.getInitialState({
  selectedBoardId: null,
  users: []
});

const { selectEntities } = adapterBoards.getSelectors();

const boardsReducer = createReducer(
  initialState,
  on(fetchBoardsSuccess, (state, { boards }) => adapterBoards.setAll(boards, state)),
  on(setSelectedBoardId, (state, { boardId }) => ({
    ...state,
    selectedBoardId: boardId
  })),
  on(fetchBoardMembersSuccess, (state, { users }) => ({
    ...state,
    users
  })),
  on(inviteUsers, (state, { users }) => ({
    ...state,
    users: [
      ...state.users,
      ...users.map(({ _id, email, img }) => ({
        _id,
        email,
        img,
        status: BoardUserStatusEnum.Invited,
        role: BoardUserRoleEnum.User
      }))
    ]
  })),
  on(toggleFavouriteBoard, (state, { boardId }) => {
    const board = selectEntities(state)[boardId];
    const changes = { id: board!._id, changes: { isFavourite: !board!.isFavourite } };
    return adapterBoards.updateOne(changes, state);
  })
);

export function reducer(state: BoardsStateI | undefined, action: Action) {
  return boardsReducer(state, action);
}
