import React from 'react';
import './TeamListItem.scss';
import UsersStack from '../../../../components/UsersStack';
import UserTitle from '../../../../components/UserTitle';
import StandardButton from '../../../../components/StandardButton';
import useReactRouter from 'use-react-router';
import { ISubordinate } from '../../../../_store/reducers/team-info.reducer';

interface IProps {
  user: ISubordinate;
}

const TeamListItem: React.FC<IProps> = ({ user }) => {
  const { history } = useReactRouter();

  /** Переход в статистику пользователя */
  const handleClick = (user: ISubordinate) => {
    history.push(`/statistics/competence/${user.oUser.sUserId}`);
  };

  /** Тоггл пина */
  const handlePin = (user: ISubordinate) => {
    console.log('pin', user.oUser.sUserId);
  };

  /** 3 последних пользователя */
  const userStack = user.aLastUsersId.length > 0 ?
    <>
      <UsersStack users={user.aLastUsersId}/>
      {user.iCountUser ? <span className='team-item__count'>{`+${user.iCountUser}`}</span> : null}
    </> : null;

  return (
    <div className='team-item'>
      <div className='team-item__user'>
        <UserTitle user={user.oUser} hasPin={true} onPin={() => handlePin(user)}/>
      </div>

      <div className='team-item__stat'>
        <p className='team-item__stat-count'>{user.iOutCount}</p>
        <p className='team-item__stat-description'>Оставил ОС</p>
      </div>

      <div className='team-item__stat'>
        <p className='team-item__stat-count'>{user.iInCount}</p>
        <p className='team-item__stat-description'>Получил ОС</p>
      </div>

      <div className='team-item__stack'>
        {userStack}
      </div>

      <div className='team-item__action'>
        <StandardButton value='Смотреть статистику' handler={() => handleClick(user)}/>
      </div>
    </div>
  );
};

export default TeamListItem;
