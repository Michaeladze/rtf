import React from 'react';
import './SearchItem.scss';
import 'antd/lib/button/style/index.css';
import UserImage from '../../../_shared/UserImage/UserImage';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import Button from 'antd/lib/button';

interface ISearchItemProps {
  user: IUser;
  onClick: (user: IUser) => void;
  icon: React.ReactNode;
}

export const SearchItem: React.FC<ISearchItemProps> = ({ user, onClick, icon }) => {
  return (
    <>
      <div className='search-user'>
        <div className='search-user__image'><UserImage userId={user.sUserId} /></div>

        <div className='search-user__details'>
          <p className='search-user__name'>{`${user.sLastName} ${user.sFirstName}`}</p>
          <p className='search-user__position'>{user.sTitle}</p>
        </div>

        <div className='search-user__mark'>
          <Button className='search-user__action' onClick={() => onClick(user)} shape='round'>
            {icon}
          </Button>
        </div>
      </div>
    </>
  );
};
