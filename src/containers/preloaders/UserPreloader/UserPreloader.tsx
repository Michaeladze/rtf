import React from 'react';
import './UserPreloader.scss';
import { breakpoints } from '../../../_helpers/helpers';

const UserPreloader = () => {

  const styles = {
    marginRight: window.innerWidth < breakpoints.large ? '15px' : '25px'
  };

  const list = [1,
    2,
    3,
    4
  ].map((i) => (
    <div className='user-preloader' style={styles} key={i}>
      <div
        className='user-preloader__image'>
      </div>

      <h3 className='user-preloader__name'><span>Загружаю</span> <br/> <span>Загружаю</span></h3>
    </div>
  ));

  return <div className='users-preloader'> {list} </div>
};

export default UserPreloader;
