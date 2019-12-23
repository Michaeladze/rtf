import React, { useEffect } from 'react';
import './ShowMoreMenu.scss';
import { useDispatch } from 'react-redux';
import { GetAssessmentsCount } from '../../../../../../_store/actions/users-inbox.action';
import FeedbackMenuButton from '../../../../../_shared/FeedbackMenu/FeedbackMenuButton/FeedbackMenuButton';
import { NavLink } from 'react-router-dom';

interface IProps {
  iIncomeRates: number;
  iIncomeRequests: number;
}

const ShowMoreMenu: React.FC<IProps> = ({ iIncomeRates, iIncomeRequests }) => {
  const dispatch = useDispatch();

  /** Диспатчим получение количества запросов и оценок */
  useEffect(() => {
    dispatch({ type: GetAssessmentsCount.Pending });
  }, [dispatch]);

  return (
    <ul className='home__show-menu'>
      <NavLink to='history'>
        <FeedbackMenuButton
          type='dropdown'
          label='Посмотреть все оценки'
          icon='arrow-downward'
          color='pink'
          count={iIncomeRates}
        />
      </NavLink>
      <NavLink to='income-requests'>
        <FeedbackMenuButton
          type='dropdown'
          label='Ответить на запросы'
          icon='arrow-upward'
          color='grey'
          count={iIncomeRequests}
        />
      </NavLink>
    </ul>
  );
};

export default ShowMoreMenu;
