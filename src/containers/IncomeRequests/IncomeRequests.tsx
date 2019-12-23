import React from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import IncomeRequestsMain from './IncomeRequestsMain/IncomeRequestsMain';
import { IncomeRequestsAside } from './IncomeRequestsAside';
import ViewContainer from '../_shared/ViewContainer';

const IncomeRequests: React.FC = () => {
  return (
    <ViewContainer goBackUrl='/'>
      <CommonContainer
        asideComponent={<IncomeRequestsAside />}
        mainComponent={<IncomeRequestsMain />}
        mainTitle={'Входящие запросы'}
      />
    </ViewContainer>
  );
};

export default IncomeRequests;
