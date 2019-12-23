import React from 'react';
import './ProfiExpertise.scss';
import { ReactComponent as Arrow } from '../../../../../../_assets/svg/arrow_dark.svg';
import { ISPExpertise } from '../../../../../../_store/interfaces/sberprofi.interface';

interface IProps {
  from: ISPExpertise;
  to: ISPExpertise;
  showMore?: boolean;
}

const ProfiExpertise: React.FC<IProps> = ({ from, to, showMore = true }) => {
  return (
    <div className='profi__expertise'>
      <h3 className='expertise__label'>Претендует на уровень</h3>
      <div className="expertise__row">
        <div className="expertise expertise__from">{from.sLevelTitle}</div>
        <Arrow/>
        <div className="expertise expertise__to">{to.sLevelTitle}</div>

        {/*{showMore &&
        <StandardButton customClass='expertise__button' type='link' value='Подробнее' handler={() => {*/}
        {/*}}/>}*/}
      </div>
    </div>
  );
};

export default ProfiExpertise;
