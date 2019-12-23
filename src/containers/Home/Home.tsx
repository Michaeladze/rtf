import React from 'react';
import './Home.scss';
import HomeInfo from './HomeInfo/HomeInfo';
import HomeMain from './HomeMain/HomeMain';

const Home = () => {

  return (
    <div className='rtf__home'>
      <div className='rtf__info-wrapper'>
        <HomeInfo/>
      </div>
      <div className='rtf__main-wrapper'>
        <HomeMain/>
      </div>
    </div>
  );
};

export default Home;
