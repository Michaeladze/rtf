import React from 'react';
import './HomeUserCard.scss';
import UserImage from '../../../../_shared/UserImage/UserImage';
import { IUser } from '../../../../../_store/reducers/users-all.reducer';
import { IStringMap } from '../../../../../_helpers/socket';
import { getShortName } from '../../../../../_helpers/helpers';

interface IHomeUserCardProps {
  user: IUser;
  activeLink: number;
}

const HomeUserCard: React.FC<IHomeUserCardProps> = ({ user, activeLink }) => {
  const classes: IStringMap<string> = {
    1: 'home__user-image--response',
    2: 'home__user-image--request'
  };

  /** Сокращение фамилии до одной буквы */
  const lastName = user.sLastName && getShortName(user.sLastName, 1, '.');

  return (
    <div className='home__user-card'>
      <div
        className={`home__user-image ${classes[activeLink]}`}>
        <UserImage userId={user.sUserId} />
      </div>

      <h3 className='home__user-name'>{`${user.sFirstName} ${lastName}`}</h3>
    </div>
  );
};

export default HomeUserCard;
