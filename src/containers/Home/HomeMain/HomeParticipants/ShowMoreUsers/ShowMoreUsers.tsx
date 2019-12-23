import React from 'react';
import { ReactComponent as ArrowRight } from '../../../../../_assets/svg/arrow_dark.svg';
import { IStringMap } from '../../../../../_helpers/socket';
import useReactRouter from 'use-react-router';

interface IProps {
  activeLink: number
}

const ShowMoreUsers: React.FC<IProps> = ({ activeLink }) => {

  const { history } = useReactRouter();

  const map: IStringMap<{link: string, label: string}> = {
    1: {
      link: '/history',
      label: 'оценки'
    },
    2: {
      link: '/income-requests',
      label: 'запросы'
    }
  };

  const handleClick = () => {
    history.push(map[activeLink].link);
  };

  return (
    <div className='home__user-card' onClick={handleClick}>
      <div className='home__user-image'>
        <div className='home__user-image--arrow'>
          <ArrowRight/>
        </div>
      </div>

      <h3 className='home__user-name'> Все {map[activeLink].label} </h3>
    </div>
  );
};

export default ShowMoreUsers;
