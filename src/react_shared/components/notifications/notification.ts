import { INotification } from './redux/notifications.reducer';
import { setNotifications } from './redux/notifications.actions';
// @ts-ignore
import { store } from '../../../index';
import { IStringMap } from '../../../_helpers/socket';

/**
 * Функция для показа уведомлений в приложении на время iShowTime из объекта уведомления
 * @param oNotification - уведомление со всеми параметрами:
 * sMessage - текст сообщения
 * iShowTime - время показа
 * iStatus - статус уведомления: Ошибка, Успех, Информация и т.д.
 */
export const sendNotification = (oNotification: INotification) => {
  // Уникальный id для уведомления, чтобы удалить его из стора впоследствии
  const iId = new Date().getTime();

  /**
   * Добавляем уведомление в стор, чтобы показать его в приложении,
   * в payload передаем объект уведомления и указываем ему уникальный id
   */
  store.dispatch({
    type: setNotifications.Add,
    payload: {
      oNotification,
      iNotificationId: iId
    }
  });

  /**
   * Удаляем текущее уведомление из стора через время iShowTime
   */
  setTimeout(() => {
    deleteNotification(iId);
  }, oNotification.iShowTime);
};

/**
 * Функция для удаления уведомления по id уведомления
 * @param iId - id уведомления, которое нужно удалить
 */
export const deleteNotification = (iId: number) => {
  /**
   * в payload передаем id уведомления, которое нужно удалить из стора
   */
  store.dispatch({
    type: setNotifications.Delete,
    payload: {
      iNotificationId: iId
    }
  });
};

/** Список возможных сообщений */
export const notification: IStringMap<string> = {
  provideFeedback: 'Обратная связь отправлена',
  requestFeedback: 'Запрос отправлен',
  error: 'Сервис временно недоступен',
  noRating: 'Оцените уровень от 1 до 10',
  userAdded: 'Пользователь добавлен',
  addProjectAssessment: 'Вы оценили достижение'
};
