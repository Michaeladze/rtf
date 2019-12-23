import React from 'react';
import './CompareRow.scss';

interface IProps {
  rowName?: string;
  children: JSX.Element[];
}

const CompareRow: React.FC<IProps> = ({ rowName, children }) => {
  /** Название ряда */
  const rowNameJSX = (rowName && rowName.length > 0) ? <div className='compare-row__name'>{rowName}</div> : '';

  return (
    <div className='compare-row'>
      {rowNameJSX}
      <div className='compare-row__details'>{children}</div>
    </div>
  );
};

export default CompareRow;
