import React from 'react';
import './InterviewExpert.scss';
import { IUser } from '../../../../../../_store/reducers/users-all.reducer';
import UserImage from '../../../../../_shared/UserImage/UserImage';

interface IProps {
  user: IUser;
}

const InterviewExpert: React.FC<IProps> = ({ user }) => {
  return (
    <div className='expert__card'>
      <div className='expert-card__photo'>
        <UserImage userId={user.sUserId}/>
      </div>
      <div className='expert-card__content'>
        <h3 className='expert-card__name'>{user.sLastName} <br/> {user.sFirstName}</h3>
        <div className='expert-card__position'>{user.sTitle}</div>
      </div>
    </div>
  );
};

export default InterviewExpert;
