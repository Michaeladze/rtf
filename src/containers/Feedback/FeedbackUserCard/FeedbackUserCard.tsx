import React from 'react';
import './FeedbackUserCard.scss';
import UserImage from '../../_shared/UserImage/UserImage';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { ReactComponent as Pin } from '../../../_assets/svg/pin.svg';
import { ReactComponent as Icon } from '../../../_assets/svg/plus.svg';
import { breakpoints, getShortName } from '../../../_helpers/helpers';

interface IFeedbackUserCardProps {
  user: IUser;
  onPin?: (user: IUser) => void;
  onDelete?: (user: IUser) => void;
  isMobileEdit?: boolean;
  // todo временный флаг, тк пока в последних юзерах не пиним/не удаляем
  isFav?: boolean;
}

export const FeedbackUserCard: React.FC<IFeedbackUserCardProps> = ({
  user,
  onPin,
  onDelete,
  isMobileEdit,
  isFav = true
}) => {
  /** Класс для активного пина */
  const pinnedClass = user.bIsPinned ? 'pinned' : '';

  /** Запинивание пользователя */
  const handlePin = (e: React.MouseEvent, user: IUser) => {
    e.stopPropagation();
    if (onPin) onPin(user);
  };

  /** Удаление пользователя из списка */
  const handleDelete = (e: React.MouseEvent, user: IUser) => {
    e.stopPropagation();
    if (onDelete) onDelete(user);
  };

  /** Отображение имен пользователей на разных разрешениях */
  const userName = (window.innerWidth > breakpoints.medium) ? `${user.sFullName}` :
    `${user.sFirstName} ${user.sLastName && getShortName(user.sLastName, 1, '.')} `;

  return (
    <>
      <div className='feedback-user-card'>
        {isFav && (
          <>
            <button
              onClick={(e: React.MouseEvent) => handlePin(e, user)}
              className={`feedback-user-card__action feedback-user-card__action--pin ${pinnedClass}`}>
              <Pin />
            </button>
            <button
              onClick={(e: React.MouseEvent) => handleDelete(e, user)}
              className={`feedback-user-card__action feedback-user-card__action--delete ${
                isMobileEdit ? 'feedback-user-card__action--edit' : ''
              }`}>
              <Icon className='feedback-user-card__icon' />
            </button>
          </>
        )}

        <div className='feedback-user-card__image'>
          <UserImage userId={user.sUserId} />
        </div>
        <p className='feedback-user-card__name'>
          {userName}
        </p>
      </div>
    </>
  );
};
