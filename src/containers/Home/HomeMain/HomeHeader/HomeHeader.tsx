import React, { useEffect, useState } from 'react';
import './HomeHeader.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../../../_store/reducers/users-all.reducer';
import { IThanksOverview } from '../../../../_store/reducers/users-inbox.reducer';
import { IStore } from '../../../../_store/store.interface';
import { customEqual } from '../../../../_helpers/helpers';
import Tooltip from '../../../_shared/Tooltip/Tooltip';
import HeaderLikesTooltip from './HeaderLikesTooltip/HeaderLikesTooltip';
import CurrentUser from '../../../_shared/CurrentUser/CurrentUser';
import { ReactComponent as ThumbUpIcon } from '../../../../_assets/svg/thumb_up.svg';
import { GetThanksCount } from '../../../../_store/actions/thanks.action';

const HomeHeader = () => {
  /** Флаг отображения дропдауна с лайками */
  const [showLikes, setShowLikes] = useState(false);

  /** Тогглим дропауд с лайками */
  const toggleLikesDropdown = () => {
    setShowLikes(!showLikes);
  };

  // ****************************************************************

  /** Диспатчер */
  const dispatch = useDispatch();

  /** Подписываемся на лайки в редьюсере */
  const likes: IThanksOverview = useSelector(
    (store: IStore) => store.inboxReducer.collection,
    customEqual
  );

  // ****************************************************************

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector(
    (store: IStore) => store.users.me,
    customEqual
  );

  /** Диспатчим получение лайков */
  useEffect(() => {
    if (loggedUser && loggedUser.sUserId) {
      dispatch({ type: GetThanksCount.Pending });
    }
  }, [dispatch, loggedUser]);

  // ****************************************************************

  /** Дропдаун с лайками */
  const likesDropdownJSX = showLikes && (
    <Tooltip toggleTooltip={setShowLikes} position='left'>
      <HeaderLikesTooltip likes={likes} />
    </Tooltip>
  );

  return (
    <header className='home__header'>
      <h2 className='home__header-greetings'>
        Привет{loggedUser ? `, ${loggedUser.sFirstName}` : ''}
      </h2>

      <div className='home__header-actions'>
        <div className='header-actions__likes' onClick={toggleLikesDropdown}>
          {likes.oInputThanks.iCount > 0 ? (
            <span className='header__likes-count'>
              {likes.oInputThanks.iCount}
            </span>
          ) : (
            ''
          )}
          <ThumbUpIcon />
          {likesDropdownJSX}
        </div>

        <div className='home-actions__user'>
          <CurrentUser user={loggedUser} />
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
