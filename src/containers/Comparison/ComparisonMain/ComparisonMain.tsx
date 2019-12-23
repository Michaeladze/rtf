import React from 'react';
import Team from './Team/Team';
import CompareStatistics from './CompareStatistics/CompareStatistics';
import Filters from './Filters/Filters';

const ComparisonMain: React.FC = () => {
  return (
    <>
      <Filters/>
      <Team/>
      <CompareStatistics/>
    </>
  );
};

export default ComparisonMain;
