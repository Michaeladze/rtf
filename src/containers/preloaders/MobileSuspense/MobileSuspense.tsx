import React from 'react';
import './MobileSuspense.scss';
import { isMobile } from '../../../_helpers/helpers';

const MobileSuspense = () => {

  const suspense = isMobile() ?
    <div className='mobile-suspense'/> :
    <div className='desktop-suspense'/>;

  return <> {suspense} </>;
};

export default MobileSuspense;
