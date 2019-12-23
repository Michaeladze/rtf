import React, { Suspense } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { isMobile } from './_helpers/helpers';
import MobileSuspense from './containers/preloaders/MobileSuspense/MobileSuspense';

const Router = () => {
  const routes = [
    {
      path: '/',
      exact: !isMobile(),
      component: React.lazy(() => import('./containers/Home'))
    },
    {
      path: '/history',
      component: React.lazy(() => import('./containers/History'))
    },
    {
      path: '/history-users',
      component: React.lazy(() => import('./containers/History/HistoryUsersMobile/HistoryUsersMobile'))
    },
    {
      path: '/feedback',
      component: React.lazy(() => import('./containers/Feedback'))
    },
    {
      path: '/feedback-provide/:userId',
      component: React.lazy(() => import('./containers/FeedbackActions'))
    },
    {
      path: '/feedback-request/:userId',
      component: React.lazy(() => import('./containers/FeedbackActions'))
    },
    {
      path: '/income-requests/:userId/',
      component: React.lazy(() => import('./containers/IncomeRequests'))
    },
    {
      path: '/statistics',
      component: React.lazy(() => import('./containers/Statistics'))
    },
    {
      path: '/team-statistics',
      component: React.lazy(() => import('./containers/TeamStatistics'))
    },
    {
      path: '/team-comparison',
      component: React.lazy(() => import('./containers/Comparison'))
    }
  ];

  const routerOutlet = routes.map((r) => (
    <Suspense fallback={<MobileSuspense/>} key={r.path}>
      <Route
        path={r.path}
        exact={r.exact || false}
        component={r.component}
      />
    </Suspense>
  ));

  return (
    <HashRouter>
      {routerOutlet}
    </HashRouter>
  );
};

export default Router;
