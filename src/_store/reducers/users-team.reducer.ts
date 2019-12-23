import { handleActions } from 'redux-actions';
import { GetMyTeam } from '../actions/users-team.action';
import { IUser } from './users-all.reducer';

export interface IMyTeamState {
  /** Команда текущего пользователя */
  collection: IUser[];
  usersLoaded: boolean;
}

export interface IMyTeamPayload {
  payload: {
    users?: IUser[];
  };
}

const initialState: IMyTeamState = {
  collection: [],
  usersLoaded: false
};

export const usersTeamReducer = handleActions(
  {
    [GetMyTeam.Success]: (state: IMyTeamState, action: IMyTeamPayload
    ) => {
      let col = [...state.collection];

      if (action.payload.users) {
        col = action.payload.users;
      }

      col.sort((a, b) => (a.sLastName > b.sLastName ? 1 : -1));

      return {
        ...state,
        collection: col,
        usersLoaded: true
      };
    }
  },
  initialState
);
