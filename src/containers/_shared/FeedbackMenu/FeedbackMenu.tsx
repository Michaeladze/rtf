import React from 'react';
import './FeedbackMenu.scss';
import 'antd/lib/button/style/index.css';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import UserImage from '../UserImage/UserImage';
import FeedbackMenuButton from './FeedbackMenuButton/FeedbackMenuButton';
import useReactRouter from 'use-react-router';
import { breakpoints, useWindowSize } from '../../../_helpers/helpers';

interface IFeedbackMenuProps {
  currentUser: IUser | null;
  type?: string;
  closeHandler?: () => void;
}

const FeedbackMenu: React.FC<IFeedbackMenuProps> = React.memo(
  ({ currentUser, type = 'default', closeHandler }) => {
    const { location, history } = useReactRouter();
    /** Ширина экрана + ререндер компонента при изменении ширины */
    const { width } = useWindowSize();

    const handleNavigate = (param: boolean) => {
      if (currentUser) {
        let url = '';

        if (param) {
          url = type === 'default' ? `/feedback-request/${currentUser.sUserId}` : `/history/${currentUser.sUserId}`;
        } else {
          url =
            type === 'default' ? `/feedback-provide/${currentUser.sUserId}` : `/income-requests/${currentUser.sUserId}`;
        }

        if (location.pathname !== url) {
          if (width && width < breakpoints.medium) {
            if (closeHandler) closeHandler();
          }

          setTimeout(() => history.push(url));

        } else {
          if (closeHandler) closeHandler();
        }
      }
    };

    /** Переход в историю */
    const goToHistory = () => {
      if (currentUser) history.push(`/history/${currentUser.sUserId}`);
      if (closeHandler) closeHandler();
    };

    return (
      <div className='dialog-feedback'>
        {currentUser && (
          <div className='feedback-menu'>
            <div className='feedback-menu__photo'>
              <UserImage userId={currentUser.sUserId}/>
            </div>
            <div className='feedback-menu__name'>{currentUser.sFullName}</div>
            <div className='feedback-menu__position'>{currentUser.sTitle}</div>

            <div className='feedback-menu__buttons'>
              <div className='feedback-menu__link' onClick={() => handleNavigate(true)}>
                <FeedbackMenuButton
                  type={type}
                  label={type === 'default' ? 'Запросить обратную связь' : 'Посмотреть оценки'}
                  icon='arrow-downward'
                  color='pink'
                  count={currentUser.iIncomeRates}
                />
              </div>

              <div className='feedback-menu__link' onClick={() => handleNavigate(false)}>
                <FeedbackMenuButton
                  type={type}
                  label={type === 'default' ? `Дать${'\n'}обратную связь` : 'Ответить на запрос'}
                  icon='arrow-upward'
                  color='grey'
                  count={currentUser.iIncomeRequests}
                />
              </div>
            </div>

            <div className='feedback-menu__history'>
              <span onClick={goToHistory} className='feedback-menu__history-link'>История оценок</span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default FeedbackMenu;
