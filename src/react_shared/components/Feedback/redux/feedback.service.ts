import Axios from 'axios-observable';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IFeedBackPost } from './feedback.action';

/**  Отправка обратной связи**/
export const sendFeedback$ = (data: IFeedBackPost): Observable<IFeedBackPost> => {
  return Axios.post('/feedback/feedbackReceiver/insertWithFiles', data, { headers: { feedback: 'true' } }).pipe(
    map(({ data }) => data)
  );
};
