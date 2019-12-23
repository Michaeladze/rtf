import React from 'react';
import './HeaderLikesTooltip.scss';
import { IThanksOverview } from '../../../../../_store/reducers/users-inbox.reducer';
import UsersStack from '../../../../../components/UsersStack';

interface IHeaderLikesTooltipProps {
  likes: IThanksOverview;
}

const HeaderLikesTooltip: React.FC<IHeaderLikesTooltipProps> = ({ likes }) => {
  /** Кто поставил мне лайк */
  const fromStack = likes.oInputThanks.aUsers && likes.oInputThanks.aUsers || [];
  /** Кому я поставил лайк */
  const toStack = likes.oOutputThanks.aUsers && likes.oOutputThanks.aUsers || [];

  const likesFromUsersJSX = fromStack.length > 0 && (
    <div className='likes__option-row'>
      <UsersStack users={fromStack} />
    </div>
  );

  /** Кому я поставил лайк */
  const likedUsersJSX = toStack.length > 0 && (
    <div className='likes__option-row'>
      <UsersStack users={toStack} />
    </div>
  );

  return (
    <ul className='likes__dropdown-list'>
      {likes.oInputThanks.iCount > 0 ? (
        <li className='likes__dropdown-option'>
          <div className='likes__option-row'>
            <div className='likes__circle likes__circle-likes'>
              {likes.oInputThanks.iCount}
            </div>
            <span className='likes__label'> Вам сказали Спасибо!</span>
          </div>
          {likesFromUsersJSX}
        </li>
      ) : (
        ''
      )}
      {likes.oOutputThanks.iCount > 0 ? (
        <li className='likes__dropdown-option'>
          <div className='likes__option-row'>
            <div className='likes__circle likes__circle-liked'>
              {likes.oOutputThanks.iCount}
            </div>
            <span className='likes__label'> Вы сказали Спасибо!</span>
          </div>
          {likedUsersJSX}
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};

export default HeaderLikesTooltip;
