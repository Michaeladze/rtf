import React from 'react';
import './RequestsNavigationItem.scss';
import { IRequestMeta } from '../../../../_store/reducers/users-request.reducer';
import { breakpoints, formatDate } from '../../../../_helpers/helpers';
import { NavLink } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { useDispatch } from 'react-redux';
import { SetActiveRequest } from '../../../../_store/actions/users-request.action';
import { IStringMap } from '../../../../_store/store.interface';

interface IRequestsNavigationItemProps {
  item: IRequestMeta;
}

const RequestsNavigationItem: React.FC<IRequestsNavigationItemProps> = ({ item }) => {
  const { match, location } = useReactRouter();
  const dispatch = useDispatch();

  /** Форматируем дату */
  const date = formatDate(item.lDate);

  /** Типы запросов */
  const requestTypes: IStringMap<string> = {
    PROJECT: 'Достижения',
    INTERVIEW: 'Интервью',
    ASSESSMENT: 'Обратная связь',
    SBERPROFI: 'Профоценка'
  };

  /** Полное или краткое обозначение месяца в зависимости от ширины экрана */
  const monthName = window.innerWidth > breakpoints.medium ? date.sMonth : date.sMonthShort;

  /** Время запроса */
  const requestTime = `${date.iDayOfMonth} ${monthName} ${date.sYear} в ${date.sHour}:${date.sMinutes}`;

  const handleClick = (e: React.MouseEvent, meta: IRequestMeta) => {
    const url = location.pathname.split('/');
    if (url[3] && url[3] === item.sId) {
      e.preventDefault();
      return;
    }
    dispatch({ type: SetActiveRequest.Set, payload: { activeAssessmentMeta: meta } });
  };

  return (
    <NavLink to={`${match.url}/${item.sId}`}
      className={`request__navigation-item`}
      activeClassName='active'
      // @ts-ignore
      onClick={(event) => handleClick(event, item)}>
      <h3 className='request__navigation-label'>{requestTypes[item.sActivityType]}</h3>
      <p className='request__navigation-date'>{requestTime}</p>
    </NavLink>
  );
};

export default RequestsNavigationItem;
