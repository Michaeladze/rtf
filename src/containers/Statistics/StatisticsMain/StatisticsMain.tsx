import React, { Suspense, useEffect } from 'react';
import './StatisticsMain.scss';
import { Route } from 'react-router';
import { NavLink } from 'react-router-dom';
import { breakpoints } from '../../../_helpers/helpers';
import useReactRouter from 'use-react-router';
import { useDispatch } from 'react-redux';
import { ClearLoadingFlag } from '../../../_store/actions/statistics.action';

export interface ITabNavigation {
  id: number;
  label: string;
  path: string;
}

const StatisticsMain = () => {
  const dispatch = useDispatch();

  /** ID подчиненного из роута */
  const { location } = useReactRouter();
  const arr = location.pathname.split('/');
  const sUserId = arr.length >= 4 && arr[3];

  useEffect(() => {
    return () => {
      dispatch({ type: ClearLoadingFlag.Set, payload: { flag: true } });
    }
  }, []);

  /** Кнопки переключения табов */
  // todo hotfix. заменить на горизонтальный скрол в моб версии
  const skillsLabel = window.innerWidth > breakpoints.medium ? 'Проф. навыки' : 'Навыки';

  const navigation: ITabNavigation[] = [
    {
      id: 1,
      label: 'Компетенции',
      path: sUserId ? `/statistics/competence/${sUserId}` : `/statistics/competence/`
    },
    {
      id: 2,
      label: 'Shaper',
      path: sUserId ? `/statistics/shaper/${sUserId}` : `/statistics/shaper/`
    },
    {
      id: 3,
      label: skillsLabel,
      path: sUserId ? `/statistics/skills/${sUserId}` : `/statistics/skills/`
    }
  ];

  /** JSX навигации */
  const navigationJSX = navigation && navigation.map((tab: ITabNavigation) => {
    return (
      <NavLink
        key={tab.id}
        activeClassName='tab__button--active'
        className='tab__button'
        to={`${tab.path}`}>
        {tab.label}
      </NavLink>
    );
  });

  /** Вложенный роутер */
  const routes = [
    {
      path: `/statistics/competence/`,
      component: React.lazy(() => import('./StatisticsCompetences'))
    },
    {
      path: `/statistics/shaper/`,
      component: React.lazy(() => import('./StatisticsShaper'))
    },
    {
      path: `/statistics/skills/`,
      component: React.lazy(() => import('./StatisticsSkills'))
    },
    {
      path: `/statistics/competence/:sUserId`,
      component: React.lazy(() => import('./StatisticsCompetences'))
    },
    {
      path: `/statistics/shaper/:sUserId`,
      component: React.lazy(() => import('./StatisticsShaper'))
    },
    {
      path: `/statistics/skills/:sUserId`,
      component: React.lazy(() => import('./StatisticsSkills'))
    }
  ];

  /** UI роутера */
  const routerOutlet = routes.map((r) => (
    <Suspense fallback={<div/>} key={r.path}>
      <Route
        path={r.path}
        exact={true}
        component={r.component}
      />
    </Suspense>
  ));

  return (
    <>
      <div className='statistic'>
        <div className='statistic__tabs'>

          <div className='tabs'>
            <div className='tab__buttons'>
              {navigationJSX}
            </div>
            <div className='tab__panels'>
              {routerOutlet}
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default StatisticsMain;
