import { handleActions } from 'redux-actions';
import { IUser } from './users-all.reducer';
import { IPagination } from '../store.interface';
import { ClearSubordinatesList, GetSubordinates } from '../actions/subordinates.action';

export interface ISubordinateState {
  isBoss: boolean;
  collection: IPagination<IUser>;
  usersLoaded: boolean;
  sUserFIO: string;
}

interface ISubordinatePayload {
  payload: {
    users?: IPagination<IUser>;
    sUserFIO?: string;
    clear?: boolean;
  };
}

const initialState: ISubordinateState = {
  isBoss: false,
  collection: {
    aObjects: [],
    bHasNext: false
  },
  usersLoaded: false,
  sUserFIO: ''
};

export const subordinatesReducer = handleActions(
  {
    [GetSubordinates.Success]: (state: ISubordinateState, action: ISubordinatePayload) => {
      state.usersLoaded = true;

      if (action.payload.users) {
        let aObjectsCopy = [];

        /** Если есть поле с запросом - чистим список, если нет - продолжаем подгружать юзеров */
        if ((action.payload.sUserFIO) || (state.sUserFIO.length > 0) ) {
          aObjectsCopy = action.payload.users.aObjects;
        } else {
          aObjectsCopy = [...state.collection.aObjects, ...action.payload.users.aObjects];
        }

        /** Копия поля поиска */
        const sUserFIOCopy = (action.payload.sUserFIO !== undefined) ? action.payload.sUserFIO : state.sUserFIO;

        return {
          ...state,
          isBoss: action.payload.users.aObjects.length > 0,
          collection: {
            aObjects: aObjectsCopy,
            bHasNext: action.payload.users.bHasNext
          },
          sUserFIO: sUserFIOCopy
        };
      }
      return state;
    },

    [ClearSubordinatesList.Set]: (state: ISubordinateState, action: ISubordinatePayload) => {
      if (action.payload.clear) {
        return {
          ...state,
          collection: {
            aObjects: [],
            bHasNext: false
          },
          usersLoaded: false,
          sUserFIO: ''
        }
      }

      return state;
    }
  },
  initialState
);
