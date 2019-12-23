import { createActions } from 'redux-actions';
import { INotification } from './notifications.reducer';

export enum setNotifications {
  Add = '[Add] Add new notification',
  Delete = '[Delete] Delete notification'
}

createActions({
  [setNotifications.Add]: (
    aNotifications: INotification[],
    iNotificationId: number
  ) => aNotifications,
  [setNotifications.Delete]: (iNotificationId: number) => iNotificationId
});
