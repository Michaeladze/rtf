import React from 'react';
import './RequestFeedbackUser.scss';
import UserTitle from '../../../../../components/UserTitle/UserTitle';
import Comment from '../../../../../components/Comment/Comment';
import { IUser } from '../../../../../_store/reducers/users-all.reducer';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import { customEqual } from '../../../../../_helpers/helpers';
import { IRequest } from '../../../../../_store/reducers/users-request.reducer';

const RequestFeedbackUser = () => {

  /** Получение активного юзера */
  const activeUser: IUser | null = useSelector((store: IStore) => store.users.activeUser, customEqual);

  /** Получение активного запроса*/
  const activeAssessment = useSelector(
    (store: IStore) => store.userRequest.selection, customEqual) as (IRequest | null);

  /** Комментарий */
  const comment = activeAssessment ? activeAssessment.oPayload.sRequesterComment : '';

  /**  Отрисовка комментария */
  const commentJSX = comment &&
      <div className='feedback-user__comment'>
        <Comment comment={comment}/>
      </div>;

  return (
    <div className='feedback-user'>
      <div className='feedback-user__header'>
        <UserTitle user={activeUser}/>
      </div>
      {commentJSX}
    </div>
  );
};

export default RequestFeedbackUser;
