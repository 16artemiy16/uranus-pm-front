import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BoardI } from '../../../interfaces/board.interface';
import { Action, createReducer, on } from '@ngrx/store';
import { fetchBoardsSuccess, toggleFavouriteBoard } from './boards.actions';

export const FEATURE_NAME = 'Boards';

// TODO: Change BoardI to a partial interface
export interface BoardsStateI extends EntityState<BoardI>{

}

export const adapter: EntityAdapter<BoardI> = createEntityAdapter<BoardI>({
  selectId: (model) => model._id,
  sortComparer: (a, b) => {
    const favDiff = +b.isFavourite - +a.isFavourite;
    const alphabetDiff = a.name.localeCompare(b.name);

    return favDiff || alphabetDiff;
  }
});

const { setMany } = adapter;
const { selectEntities } = adapter.getSelectors();

export const initialState: BoardsStateI = adapter.getInitialState();

const boardsReducer = createReducer(
  initialState,
  on(fetchBoardsSuccess, (state, { boards }) => setMany(boards, state)),
  on(toggleFavouriteBoard, (state, { boardId }) => {
    const board = selectEntities(state)[boardId];
    const changes = { id: board!._id, changes: { isFavourite: !board!.isFavourite } };
    return adapter.updateOne(changes, state);
  })
);

export function reducer(state: BoardsStateI | undefined, action: Action) {
  return boardsReducer(state, action);
}
