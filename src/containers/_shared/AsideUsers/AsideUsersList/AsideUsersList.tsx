import React from 'react';
import UserCard from '../../../_shared/UserCard/UserCard';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import useReactRouter from 'use-react-router';
import { ClearAssessmentsLoadedFlag } from '../../../../_store/actions/users-request.action';
import { useDispatch } from 'react-redux';

interface IAsideUsersListProps {
  users: IUser[];
  title: string;
  /** Клик по карточке */
  onUserClick?: (user: IUser) => void;
}

const AsideUsersList: React.FC<IAsideUsersListProps> = ({
  users,
  title,
  onUserClick
}) => {
  const { history, location } = useReactRouter();
  const dispatch = useDispatch();

  /** Клик по карточке */
  const handleClick = (user: IUser) => {
    if (
      location.pathname.indexOf('feedback-provide') >= 0 ||
      location.pathname.indexOf('feedback-request') >= 0||
      location.pathname.indexOf('statistics') >= 0
    ) {
      if (onUserClick) {
        onUserClick(user);
      }
    } else {
      if (location.pathname.indexOf('income-requests') >= 0) {
        dispatch({ type: ClearAssessmentsLoadedFlag.Set, payload: { clearAssessments: true } });
      }
      const locationArray = location.pathname.split('/');
      history.push(`/${locationArray[1]}/${user.sUserId}`);
    }
  };

  /** Список пользователей */
  const userList = users.map((user) => (
    <div onClick={() => handleClick(user)} key={user.sUserId + Math.random()}>
      <UserCard user={user} />
    </div>
  ));

  return (
    <>
      <h3 className='aside__users-title'>{title}</h3>
      <div className='aside__user-list'>{userList}</div>
    </>
  );
};
export default AsideUsersList;
