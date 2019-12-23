import { handleActions } from 'redux-actions';
import { setNotifications } from './notifications.actions';

export interface INotification {
  // Текст сообщения
  sMessage: string;
  // ID нотификации не надо проставлять генерится автоматом
  iId?: number;
  // Тип сообщения: Ошибка(0), Успешно(1), Информация(2), Спасибо(3) и т.п.
  iStatus?: number;
  // Время, сколько будет показано уведомление в милисекундах, по умолчанию 3000
  iShowTime?: number;
}

export interface INotificationsState {
  collection: INotification[];
}

interface IAddNotification {
  // Описание уведомления
  oNotification: INotification;
  // Id уведомления
  iNotificationId: number;
}

interface IDeleteNotification {
  // Id уведомления
  iNotificationId: number;
}

const initialState: INotificationsState = {
  collection: []
};

const notificationsReducer = handleActions(
  {
    [setNotifications.Add]: (
      state: INotificationsState,
      action: { payload: IAddNotification }
    ) => {
      // Для отображения уведомления выставляем время в 3000ms, если его не указали
      action.payload.oNotification.iShowTime =
        action.payload.oNotification.iShowTime || 3000;
      // Добавляем актуальный id для уведомления
      action.payload.oNotification.iId = action.payload.iNotificationId;
      return {
        collection: [...state.collection, action.payload.oNotification]
      };
    },
    // =================================================================
    [setNotifications.Delete]: (
      state: INotificationsState,
      action: { payload: IDeleteNotification }
    ) => ({
      collection: [...state.collection].filter(
        ({ iId }) => action.payload.iNotificationId !== iId
      )
    })
  },
  initialState
);
export default notificationsReducer;
