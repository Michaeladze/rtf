import React from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import ViewContainer from '../_shared/ViewContainer';
import ComparisonMain from './ComparisonMain';
import useReactRouter from 'use-react-router';

const Comparison = () => {
  const { history } = useReactRouter();

  /** Переход на предыдущую страницу */
  const goBack = () => {
    history.push('/team-statistics');
  };

  return (
    <ViewContainer goBackUrl='/'>
      <CommonContainer
        mainComponent={<ComparisonMain/>}
        mainTitle={'Сравнение сотрудников'}
        goBack={goBack}
      />
    </ViewContainer>
  );
};
export default Comparison;
