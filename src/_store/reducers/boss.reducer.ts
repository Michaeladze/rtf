import { handleActions } from 'redux-actions';
import { IUser } from './users-all.reducer';
import { GetBoss } from '../actions/boss.action';

/** Интерефейс стейта */
export interface IBossState {
  boss: IUser | null;
  bossLoaded: boolean;
}

export interface IBossPayload {
  payload: {
    boss?: IUser
  };
}

const initialState: IBossState = {
  boss: null,
  bossLoaded: false
};

const bossReducer = handleActions(
  {
    [GetBoss.Success]: (
      state: IBossState,
      action:  IBossPayload
    ) => {
      if (action.payload.boss) {
        return {
          ...state,
          boss: action.payload.boss,
          bossLoaded: true
        };
      }
      return state;
    }
  },
  initialState
);

export default bossReducer;
