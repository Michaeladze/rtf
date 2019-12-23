import { ActionsObservable, ofType } from 'redux-observable';
import { Action } from 'redux-actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IUser } from '../reducers/users-all.reducer';
import { AddToFeedbackFav, DeleteFromFav, GetFavFeedbackUsers, SetPinForFav } from '../actions/users-favourite.action';
import { addUserToFavourite, getFavouriteUsers, removeUserFromFavourite } from '../services/users-favourite.service';
import { showErrorMessage } from '../actions/_common.action';

/** Эффект получения списка избранных пользователей */
export const getFavFeedbackUsersEffect$ = (
  actions$: ActionsObservable<Action<IUser[]>>
) =>
  actions$.pipe(
    ofType(GetFavFeedbackUsers.Pending),
    switchMap(() =>
      getFavouriteUsers().pipe(
        map((data) => ({
          type: GetFavFeedbackUsers.Success,
          payload: { users: data }
        })),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект добавления пользователя в избранное */
export const addToFeedbackFavEffect$ = (
  actions$: ActionsObservable<Action<IUser>>
) =>
  actions$.pipe(
    ofType(AddToFeedbackFav.Pending),
    switchMap((action) =>
      addUserToFavourite(action.payload.sUserId).pipe(
        map(() => {
          return {
            type: AddToFeedbackFav.Success,
            payload: { currentUser: action.payload }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект удаления пользователя из списка (Избранное) */
export const deleteFromFavEffect$ = (
  actions$: ActionsObservable<Action<IUser>>
) =>
  actions$.pipe(
    ofType(DeleteFromFav.Pending),
    switchMap((action) =>
      removeUserFromFavourite(action.payload.sUserId).pipe(
        map(() => {
          return {
            type: DeleteFromFav.Success,
            payload: { currentUser: action.payload }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );

/** Эффект запинивания пользователя (Избранное) */
export const setPinForFavEffect$ = (
  actions$: ActionsObservable<Action<IUser>>
) =>
  actions$.pipe(
    ofType(SetPinForFav.Pending),
    switchMap((action) =>
      addUserToFavourite(action.payload.sUserId, action.payload.bIsPinned).pipe(
        map(() => {
          return {
            type: SetPinForFav.Success,
            payload: { currentUser: action.payload }
          };
        }),
        catchError(() => showErrorMessage())
      )
    )
  );
