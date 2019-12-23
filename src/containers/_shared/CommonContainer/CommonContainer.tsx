import React, { useEffect, useState } from 'react';
import './CommonContainer.scss';
import { useSelector } from 'react-redux';
import { breakpoints, customEqual } from '../../../_helpers/helpers';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { IStore } from '../../../_store/store.interface';
import CurrentUser from '../CurrentUser/CurrentUser';
import Navigation from './Navigation/Navigation';
import useReactRouter from 'use-react-router';
import GoBackButton from '../../../components/GoBackButton';

interface ICommonContainerProps {
  asideComponent?: React.ReactNode;
  mainComponent: React.ReactNode;
  mainTitle: string;
  subtitle?: string;
  isOneLineHeader?: boolean;
  /** Вернуться назад */
  goBack?: () => void;
}

const CommonContainer: React.FC<ICommonContainerProps> = ({
  asideComponent, mainComponent, mainTitle, subtitle, isOneLineHeader = false, goBack
}) => {
  const { location } = useReactRouter();
  const [incomeRequestMobileClass, setClassName] = useState('');

  useEffect(() => {
    setClassName(location.pathname.indexOf('income-requests') >= 0 ? 'income' : '');
  }, []);

  /** Дополнительные стили, если отсутствует asideComponent */
  const wideClass = asideComponent ? '' : 'wide';

  /** Подписываемся на вошедшего юзера */
  const loggedUser: IUser | null = useSelector((store: IStore) => store.users.me, customEqual);

  /** Дополнительный CSS класс для отображения подзаголовка на одной строке с заголовком */
  const oneLineHeaderClass = (isOneLineHeader && window.innerWidth > breakpoints.medium) ? 'one-line' : '';

  /** Кнопка для перехода на предыдущую страницу */
  const goBackButtonJSX = goBack && <GoBackButton goBack={goBack} />;

  /** Дополнительный CSS класс для отображения заголовка c кнопкой Назад */
  const backClass = (goBack && window.innerWidth > breakpoints.medium) ? 'back' : '';

  return (
    <div className={`rtf__common-container ${wideClass}`}>
      <Navigation />

      <div className='rtf__common-container--body'>
        {asideComponent && (
          <div className='rtf__common-wrapper'>
            <aside className='rtf__common-aside'>{asideComponent}</aside>
          </div>
        )}

        <main className={`rtf__common-body ${wideClass}`}>
          <div className={`rtf__common-body--overflow ${incomeRequestMobileClass}`}>
            <div className='rtf__common-content'>
              <header className='common-container__header'>
                <div className={`common-container__title ${oneLineHeaderClass} ${backClass}`}>
                  {goBackButtonJSX}
                  <h1 className='common-container__title-text'>{mainTitle}</h1>
                  {subtitle && (
                    <p className='common-container__subtitle'>{subtitle}</p>
                  )}
                </div>
                <div className='common-container__user'>
                  <CurrentUser user={loggedUser} />
                </div>
              </header>

              {mainComponent}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CommonContainer;
