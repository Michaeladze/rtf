import { handleActions } from 'redux-actions';
import { IUser, IUsersReducerPayload } from './users-all.reducer';
import {
  DeleteFromRecent,
  GetRecentUsers,
  SetPinForRecent, UpdateRecentFlag
} from '../actions/users-recent.action';

export interface IRecentUsersState {
  /** Недавние пользователи с активностью */
  collection: IUser[];
  usersLoaded: boolean;
}

const initialState: IRecentUsersState = {
  collection: [],
  usersLoaded: false
};

export const usersRecentReducer = handleActions(
  {
    [GetRecentUsers.Success]: (state: IRecentUsersState, action: IUsersReducerPayload) => {
      state.usersLoaded = true;

      let col = [...state.collection];

      if (action.payload.users) {
        col = action.payload.users;
      }

      return { ...state, collection: col };
    },
    [SetPinForRecent.Success]: (
      state: IRecentUsersState,
      action: IUsersReducerPayload
    ) => {
      const col = [...state.collection];

      if (action.payload.currentUser && action.payload.currentUser.sUserId) {
        const index = state.collection.findIndex((data) => {
          return action.payload.currentUser
            ? data.sUserId === action.payload.currentUser.sUserId
            : false;
        });

        // копия пользователя, которому нужно обновить статус пина
        let currentUser = { ...col[index] };
        // обновляем статус пина
        currentUser.bIsPinned =
          currentUser.bIsPinned === false || !currentUser.bIsPinned;

        col[index] = currentUser;
      }

      return {
        ...state,
        collection: col
      };
    },
    [DeleteFromRecent.Success]: (state: IRecentUsersState, action: IUsersReducerPayload) => {
      const col = [...state.collection];

      if (action.payload.currentUser && action.payload.currentUser.sUserId) {
        const index = state.collection.findIndex((data) => {
          return action.payload.currentUser
            ? data.sUserId === action.payload.currentUser.sUserId
            : false;
        });

        col.splice(index, 1);
      }

      return {
        ...state,
        collection: col
      };
    },

    [UpdateRecentFlag.Success]: (state: IRecentUsersState, action: IUsersReducerPayload) => {
      return (action.payload.userId && state.collection[0] && state.collection[0].sUserId !== action.payload.userId) ?
        { ...state, usersLoaded: false } : { ...state }
    }
  },
  initialState
);
