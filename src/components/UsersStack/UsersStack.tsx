import React from 'react';
import { UserStackCount, UserStackedItem, UserStackRow } from './UsersStack.styles';
import UserImage from '../../containers/_shared/UserImage/UserImage';

interface IUsersStackProps {
  users: string[];
  className?: string;
}

const UsersStack: React.FC<IUsersStackProps> = ({ users, className }) => {
  const stackJSX = users.map((user, i) => {
    if (i > 2) {
      return null;
    }

    return (
      <UserStackedItem index={i} key={i}>
        <UserImage userId={user}/>
      </UserStackedItem>
    );
  });

  const usersCountJSX = (users.length > 3) && (
    <UserStackCount className={className}>{` +${users.length - 3}`}</UserStackCount>
  );

  return (
    <UserStackRow>
      {stackJSX}
      <UserStackedItem index={3}>
        {usersCountJSX}
      </UserStackedItem>
    </UserStackRow>
  );
};

export default UsersStack;
