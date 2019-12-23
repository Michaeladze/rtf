import React from 'react';
import './RequestTooltip.scss';

interface IRequestTooltipProps {
  value: number;
}

export const ICONS = {
  BAD: require('../../../../../../_assets/smiles/1-2.png'),
  NOT_BAD: require('../../../../../../_assets/smiles/3-4.png'),
  NORMAL: require('../../../../../../_assets/smiles/5-6.png'),
  GOOD: require('../../../../../../_assets/smiles/7-8.png'),
  EXCELLENT: require('../../../../../../_assets/smiles/9-10.png')
};

const RequestTooltip: React.FC<IRequestTooltipProps> = ({ value }) => {
  const valueobj: any = {
    1: {
      text: '1 - \n Требуются значительные улучшения',
      icon: ICONS.BAD
    },
    2: {
      text: '2 - \n Требуются значительные улучшения',
      icon: ICONS.BAD
    },
    3: {
      text: '3 - \n Требуются улучшения',
      icon: ICONS.NOT_BAD
    },
    4: {
      text: '4 - \n Требуются улучшения',
      icon: ICONS.NOT_BAD
    },
    5: {
      text: '5 - \n Хорошо, есть что улучшать',
      icon: ICONS.NORMAL
    },
    6: {
      text: '6 - \n Хорошо, есть что улучшать',
      icon: ICONS.NORMAL
    },
    7: {
      text: '7 - \n Очень хорошо',
      icon: ICONS.GOOD
    },
    8: {
      text: '8 - \n Очень хорошо',
      icon: ICONS.GOOD
    },
    9: {
      text: '9 - \n Пример для подражания',
      icon: ICONS.EXCELLENT
    },
    10: {
      text: '10 - \n Пример для подражания',
      icon: ICONS.EXCELLENT
    }
  };

  /** Текст тултипа на разных разрешенниях экрана */
  const tooltipText = window.innerWidth > 660 ? valueobj[`${value}`].text : (valueobj[`${value}`].text as string).split('-')[0];

  return (
    <>
      <div className='tooltip-request'>
        <div className='tooltip-request__text'>{tooltipText}</div>
        <img className='draggable-image' width='40' height='40' src={valueobj[`${value}`].icon} alt='' />
      </div>
    </>
  );
};
export default RequestTooltip;
