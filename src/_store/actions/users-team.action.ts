import { createActions } from 'redux-actions';
import { IUser } from '../reducers/users-all.reducer';

/** Экшн получения команды текущего пользователя */
export enum GetMyTeam {
  Pending = '[Pending] Получение команды текущего пользователя',
  Success = '[Success] Получение команды текущего пользователя'
}

createActions({
  [GetMyTeam.Pending]: undefined,
  [GetMyTeam.Success]: (payload: { users: IUser[] }) => payload
});

