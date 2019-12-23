import React, { useState } from 'react';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import UserImage from '../UserImage/UserImage';
import Tooltip from '../Tooltip/Tooltip';
import UserDropdown from './UserDropdown/UserDropdown';
import './CurrentUser.scss';
import { breakpoints, useWindowSize } from '../../../_helpers/helpers';

interface IProps {
  user: IUser | null;
}
// ...
const CurrentUser: React.FC<IProps> = ({ user }) => {
  /** Флаг отображения дропдауна с лайками */
  const [showMenu, toggleMenu] = useState(false);

  /** Тогглим дропауд с лайками */
  const toggleMenuDropdown = () => {
    toggleMenu(!showMenu);
  };

  const { width } = useWindowSize();

  /** Дропдаун с меню */
  const menuDropdownJSX = showMenu && (
    <Tooltip
      toggleTooltip={toggleMenu}
      position={width && width < breakpoints.medium ? 'right' : 'left'}>
      <UserDropdown user={user} />
    </Tooltip>
  );

  return (
    <div className='rtf__current-user' onClick={toggleMenuDropdown}>
      <UserImage userId={user ? user.sUserId : undefined} />
      {menuDropdownJSX}
    </div>
  );
};

export default CurrentUser;
