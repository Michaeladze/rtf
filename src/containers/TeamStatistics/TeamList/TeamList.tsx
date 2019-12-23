import React from 'react';
import './TeamList.scss';
import TeamListItem from './TeamListItem';
import { ISubordinate } from '../../../_store/reducers/team-info.reducer';

interface IProps {
  users: ISubordinate[];
}

const TeamList: React.FC<IProps> = ({ users }) => {
  /** Список пользователей */
  const usersJSX = users.map((user: ISubordinate) => (
    <div key={user.oUser.sUserId} className='team-list__item'>
      <TeamListItem user={user}/>
    </div>
  ));

  return (
    <div className='team-list'>{usersJSX}</div>
  );
};

export default TeamList;
