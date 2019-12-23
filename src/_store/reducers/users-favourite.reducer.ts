import { handleActions } from 'redux-actions';
import { IUser, IUsersReducerPayload } from './users-all.reducer';
import {
  AddToFeedbackFav,
  DeleteFromFav,
  GetFavFeedbackUsers,
  SetPinForFav
} from '../actions/users-favourite.action';

/** Интерфейс стейта для пользователей из Обратной связи */
export interface IFavouriteUsersState {
  /** Избранные пользователи */
  collection: IUser[];
  /** Флаг загрузки данных */
  usersLoaded: boolean;
}

const initialState: IFavouriteUsersState = {
  collection: [],
  usersLoaded: false
};

export const usersFavouriteReducer = handleActions(
  {
    [GetFavFeedbackUsers.Success]: (
      state: IFavouriteUsersState,
      action: IUsersReducerPayload
    ) => {
      if (action.payload.users) {
        return {
          ...state,
          collection: getSortedList(action.payload.users),
          usersLoaded: true
        };
      }
      return state;
    },
    [SetPinForFav.Success]: (
      state: IFavouriteUsersState,
      action: IUsersReducerPayload
    ) => {
      const col = [...state.collection];

      if (action.payload.currentUser && action.payload.currentUser.sUserId) {
        const index = state.collection.findIndex((data) => {
          return action.payload.currentUser
            ? data.sUserId === action.payload.currentUser.sUserId
            : false;
        });

        if (index >= 0) {
          col[index].bIsPinned = action.payload.currentUser.bIsPinned;
        }
      }

      return {
        ...state,
        collection: getSortedList(col)
      };
    },
    [DeleteFromFav.Success]: (
      state: IFavouriteUsersState,
      action: IUsersReducerPayload
    ) => {
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
    [AddToFeedbackFav.Success]: (
      state: IFavouriteUsersState,
      action: IUsersReducerPayload
    ) => {
      const col = [...state.collection];
      if (action.payload.currentUser && action.payload.currentUser.sUserId) {
        const index = state.collection.findIndex((data) => {
          return action.payload.currentUser
            ? data.sUserId === action.payload.currentUser.sUserId
            : false;
        });

        if (index < 0) {
          col.push(action.payload.currentUser);
        }
      }

      return {
        ...state,
        collection: getSortedList(col)
      };
    }
  },
  initialState
);

/** Функция для сортировки по статусу пина и алфавиту
 *
 * @param arr - массив, который нужно отсортировать
 * */
export const getSortedList = (arr: IUser[]) => {
  /** Собираем массив запиненных пользователей по алфавиту */
  const pinned = arr
    .filter((user) => user.bIsPinned)
    .sort((a, b) => (a.sLastName > b.sLastName ? 1 : -1));

  /** Собираем всех остальных пользователей по алфавиту */
  const others = arr
    .filter((item) => item.bIsPinned === false || item.bIsPinned === undefined)
    .sort((a, b) => (a.sLastName > b.sLastName ? 1 : -1));

  return pinned.concat(others);
};
