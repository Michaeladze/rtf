import { createSelector } from 'reselect';
import { IStore } from '../store.interface';
import { IUser } from '../reducers/users-all.reducer';

export const selectSearchResult = createSelector(
  (state: IStore) => state.allUsers.collection,
  (state: IStore) => state.users.me,
  (list, me) => {
    if (me && list.length > 0) {
      /** Вырезаем себя из списка */
      const index = list.findIndex((u) => u.sUserId === me.sUserId);

      if (index >= 0) {
        list.splice(index, 1);
      }
    }

    return list
  }
);

// ========================================================================================================

/** Список юзеров в истории */
export const selectHistoryList = createSelector(
  (state: IStore) => state.users.activeUser,
  (state: IStore) => state.userHistory.users.aObjects,
  (user, list) => filterListWithPagination(user, list, true)
);

// ========================================================================================================

/** Список юзеров в запросах */
export const selectRequestList = createSelector(
  (state: IStore) => state.users.activeUser,
  (state: IStore) => state.userRequest.users.aObjects,
  (user, list) => filterListWithPagination(user, list, true)
);

// ========================================================================================================

/** Список недавних юзеров */
export const selectRecentList = createSelector(
  (state: IStore) => state.users.activeUser,
  (state: IStore) => state.recentUsers.collection,
  (state: IStore) => state.recentUsers.usersLoaded,
  (state: IStore) => state.users.searchInput,
  (user, list, flag, searchInput) => filterList(user, list, flag, searchInput)
);

// ========================================================================================================

/** Список подчиненных */
export const selectSubordinatesList = createSelector(
  (state: IStore) => state.users.activeUser,
  (state: IStore) => state.subordinates.collection.aObjects,
  (user, list) => filterListWithPagination(user, list, true)
);

// ========================================================================================================

/** Функция фильтрации */
const filterList = (user: IUser | null, list: IUser[], flag: boolean, searchInput: string) => {
  if (flag && user && list.length > 0) {
    return list.filter((u) => {

      let valid = true;

      if (u.sFullName && !u.sFullName.toLowerCase().includes(searchInput.toLowerCase())) {
        valid = false;
      }

      if (u.sUserId === user.sUserId) {
        valid = false;
      }

      return valid;
    });
  }

  return list;
};

// ========================================================================================================

/** Функция фильтрации на бэке */
const filterListWithPagination = (user: IUser | null, list: IUser[], flag: boolean) => {
  if (flag && user && list.length > 0) {
    return list.filter((u) => {

      let valid = true;

      if (u.sUserId === user.sUserId) {
        valid = false;
      }

      return valid;
    });
  }

  return list;
};
