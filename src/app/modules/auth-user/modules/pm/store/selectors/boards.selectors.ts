import { adapterBoards } from '../reducers/boards.reducer';
import { createSelector } from '@ngrx/store';
import { selectBoardsState } from '../index';
import { BoardI } from '../../interfaces/board.interface';
import { BoardUserI } from '../../../../../../interfaces/board-user.interface';
const {
  selectAll,
  selectEntities
} = adapterBoards.getSelectors();

export const getAll = createSelector(
  selectBoardsState,
  (state) => selectAll(state)
);

export const getSelected = createSelector(
  selectBoardsState,
  (state) => {
    const { selectedBoardId } = state;
    const boards = selectEntities(state);

    return selectedBoardId
      ? boards[selectedBoardId] as BoardI
      :  null;
  }
);

export const getMembers = createSelector(
  selectBoardsState,
  ({ users }) => users
);

export const getMemberById = (id: string) => createSelector(
  getMembers,
  (users) => {
    return users.find((user) => user._id === id) || null;
  }
);

export const getMembersOrderedByEmailStr = (emailStr: string) => createSelector(
  getMembers,
  (users) => {
    const predicate = (isMatched: boolean) => {
      return (user: BoardUserI) => isMatched === (user.email.indexOf((emailStr || '').trim()) === 0);
    };
    // TODO refactor to pairs util
    const firstUsers = users.filter(predicate(true));
    const lastUsers = users.filter(predicate(false));

    return [...firstUsers, ...lastUsers];
  }
);
