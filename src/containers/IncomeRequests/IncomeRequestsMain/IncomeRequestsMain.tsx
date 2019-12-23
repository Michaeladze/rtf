import React from 'react';
import './IncomeRequestsMain.scss';
import RequestsNavigation from './RequestsNavigation/RequestsNavigation';
import RequestFeedback from './RequestFeedback/RequestFeedback';
import { Route } from 'react-router-dom';
import useReactRouter from 'use-react-router';

const IncomeRequestsMain = () => {
  const { match } = useReactRouter();

  return <>
    {window.innerWidth >= 660 && <RequestsNavigation/>}
    <Route path={`${match.url}/:requestId`} component={() => <RequestFeedback/>}/>
    {window.innerWidth < 660 && <RequestsNavigation/>}
  </>
};

export default IncomeRequestsMain;
