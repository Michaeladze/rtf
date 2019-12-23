import React from 'react';
import './UserTitle.scss';
import UserImage from '../../containers/_shared/UserImage/UserImage';
import { IUser } from '../../_store/reducers/users-all.reducer';
import { breakpoints, getShortName } from '../../_helpers/helpers';
import { ReactComponent as Pin } from '../../_assets/svg/pin.svg';

interface IUserTitleProps {
  user: IUser | null;
  hasPin?: boolean;
  onPin?: (user: IUser) => void;
}

const UserTitle: React.FC<IUserTitleProps> = ({ user, hasPin = false, onPin }) => {
  /** Имя пользователя */
  let userName = user && `${user.sFirstName} ${user.sLastName}`;
  const middleName =
    <span className='user-title__patronymic'>{(user && user.sMiddleName) ? user.sMiddleName : ''}</span>;

  if (user) {
    if (window.innerWidth > breakpoints.medium) {
      userName = `${user.sLastName} ${user.sFirstName}`;
    } else {
      userName = `${user.sFirstName} ${user.sLastName && getShortName(user.sLastName, 1, '.')}`;
    }
  }

  /** Класс для активного пина */
  const pinnedClass = user && user.bIsPinned ? 'pinned' : '';

  /** Запинивание пользователя */
  const handlePin = (user: IUser | null) => {
    if (onPin && user) onPin(user);
  };

  /** Пин */
  const pin = (hasPin && window.innerWidth > breakpoints.medium) ? <button
    onClick={() => handlePin(user)}
    className={`user-title__pin ${pinnedClass}`}>
    <Pin />
  </button> : null;

  const userJSX = user ? (
    <div className='user-title'>
      <div className='user-title__photo'>
        <UserImage userId={user.sUserId} />
        {pin}
      </div>
      <div className='user-title__content'>
        <h3 className='user-title__name'>{`${userName} `}
          {middleName}
        </h3>
        <div className='user-title__position'>{user.sTitle}</div>
      </div>
    </div>
  ) : (
    'Пользователь не найден'
  );

  return <>{userJSX}</>;
};
export default UserTitle;
