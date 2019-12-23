import React, { useCallback, useRef } from 'react';
import './Tooltip.scss';
import { useOnClickOutside } from '../../../_helpers/helpers';

interface ITooltipProps {
  toggleTooltip: (f: boolean) => void;
  children: JSX.Element[] | JSX.Element;
  position?: 'left' | 'right';
}

const Tooltip: React.FC<ITooltipProps> = ({
  toggleTooltip,
  children,
  position = 'left'
}) => {
  /** Обработка клика в аутсайд */
  const widgetNode = useRef<HTMLDivElement>(null);
  const handlerOutSide = useCallback(() => toggleTooltip(false), [
    toggleTooltip
  ]);
  useOnClickOutside(widgetNode, handlerOutSide);

  return (
    <>
      <div className='tooltip__outside' />
      <div
        className={`tooltip ${position === 'right' ? 'tooltip-right' : ''}`}
        ref={widgetNode}>
        {children}
      </div>
    </>
  );
};

export default Tooltip;
