import React from 'react';
import './UserCard.scss';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import UserImage from '../UserImage/UserImage';

interface IUserCardProps {
  user: IUser;
  /** Флаг выбранного пользователя */
  isActive?: boolean;
  /** Клик по карточке */
  onUserClick?: (user: IUser) => void;
}

const UserCard: React.FC<IUserCardProps> = ({ user, isActive, onUserClick }) => {
  /** Класс для активной карточки */
  const activeClass = isActive ? 'user-card--active' : '';

  const handleClick = (user: IUser) => {
    if (onUserClick) onUserClick(user);
  };

  return (
    <div className={`user-card ${activeClass}`} onClick={() => handleClick(user)} title={user.sTitle}>
      <div className='user-card__photo'>
        <UserImage userId={user.sUserId}/>
      </div>
      <div className='user-card__content'>
        <p className='user-card__name'>{user.sFirstName}</p>
        <p className='user-card__name'>{user.sLastName}</p>
        <div className='user-card__position'>{user.sTitle}</div>
      </div>

      {user.iIncomeRequests ? (
        <div className='user-card__messages'>
          <span className='messages-count'>{user.iIncomeRequests}</span>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserCard;
