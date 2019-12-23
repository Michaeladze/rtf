import React from 'react';
import UserImage from '../../../../_shared/UserImage/UserImage';
import { IUser } from '../../../../../_store/reducers/users-all.reducer';
import './Member.scss';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import { IComparisonUser } from '../../../../../_store/reducers/comparison.reducer';
import { getShortName } from '../../../../../_helpers/helpers';

interface IProps {
  user: IUser;
  handler: (user: IUser) => void;
}

const Member: React.FC<IProps> = ({ user, handler }) => {
  /** Список пользователей в сравнении */
  const users: IComparisonUser[] = useSelector((store: IStore) => store.comparison.collection);

  /** Есть в списке для сравнения */
  const isInComparison: boolean = users.map((u) => u.user.sUserId).indexOf(user.sUserId) >= 0;

  /** Сокращение фамилии до одной буквы */
  const lastName = user.sLastName && getShortName(user.sLastName, 1, '.');

  /** Клик по юзеру */
  const onClick = (user: IUser) => {
    if (users.length < 4 || isInComparison) {
      handler(user);
    }
  };

  return (
    <div className={`member__user-card ${isInComparison ? 'active' : ''} ${users.length >= 4 ? 'disabled' : ''}`}
      onClick={() => onClick(user)}>
      <div className='member__user-image'>
        <UserImage userId={user.sUserId}/>
        <div className='member__user-image--mark'/>
      </div>

      <h3 className='member__user-name'>{`${user.sFirstName} ${lastName}`}</h3>
    </div>
  );
};

export default Member;
