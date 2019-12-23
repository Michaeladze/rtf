import { createActions } from 'redux-actions';
import { of } from 'rxjs';
import { notification, sendNotification } from '../../react_shared/components/notifications/notification';

export enum Success {
  Success = '--------------------------'
}

export enum Common {
  Error = '[Error] --------------------------'
}

createActions({
  [Success.Success]: undefined,
  [Common.Error]: undefined
});

/** Отправляем сообщение об ошибке
 * @param error - объект ошибки. Из него вытаскиваем код и по коду устанавливаем сообщение
 * */
export const showErrorMessage = () => {

  sendNotification({
    sMessage: notification.error,
    iStatus: 0
  });

  return of({ type: Common.Error })
};
