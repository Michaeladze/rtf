import React, { useState } from 'react';
import { IUser } from '../../../../../_store/reducers/users-all.reducer';
import HomeUserCard from '../HomeUserCard/HomeUserCard';
import CustomSwiper from '../../../../_shared/CustomSwiper/CustomSwiper';
import ShowMoreUsers from '../ShowMoreUsers/ShowMoreUsers';
import { IAssessmentsCount } from '../../../../../_store/reducers/users-inbox.reducer';
import { customEqual } from '../../../../../_helpers/helpers';
import { useSelector } from 'react-redux';
import { IStore } from '../../../../../_store/store.interface';
import UserPreloader from '../../../../preloaders/UserPreloader/UserPreloader';
import { IStringMap } from '../../../../../_helpers/socket';
import NotificationBanner from '../../../../_shared/NotificationBanner';

interface IProps {
  items: IUser[];
  handleClick: (p: IUser) => void;
  activeLink: number;
  assessmentsCount: IAssessmentsCount;
}

const HomeUsersList: React.FC<IProps> = ({
  items,
  handleClick,
  activeLink,
  assessmentsCount
}) => {
  /** Отображение дропдауна со всеми входящими */
  const [showDropdown, toggleDropdown] = useState(false);

  const handleToggleDropdown = () => {
    toggleDropdown(!showDropdown);
  };

  /** Кнопка "Еще запросы" */
  const showAllUsers = (
    <div style={{ width: '85px' }} key={20} onClick={handleToggleDropdown}>
      <ShowMoreUsers activeLink={activeLink}/>
    </div>
  );

  /** JSX списка сотрудников */
  let list =
    items &&
    items.map((p: IUser) => (
      <div
        style={{ width: '85px' }}
        key={p.sUserId}
        onClick={() => handleClick(p)}>
        <HomeUserCard user={p} activeLink={activeLink}/>
      </div>
    ));

  /** Флаги загрузки юзеров */
  const recentUsersLoaded: boolean = useSelector((store: IStore) => store.recentUsers.usersLoaded, customEqual);
  const inboxLoaded: boolean = useSelector((store: IStore) => store.inboxReducer.inboxLoaded, customEqual);
  const requestsLoaded: boolean = useSelector((store: IStore) => store.inboxReducer.requestsLoaded, customEqual);

  const flags: IStringMap<boolean> = {
    '1': inboxLoaded,
    '2': requestsLoaded,
    '3': recentUsersLoaded
  };

  const flag = flags[activeLink];

  /** Если текущая вкладка Входящие, то добавляем к списку кнопку */
  if (activeLink !== 3) {
    list = list.length > 15 ? [...list, showAllUsers] : [...list];
  }

  /** Количество слайдов в зависимости от ширины экрана */
  let slidesPerView = 6;
  if (window.innerWidth <= 1440 && window.innerWidth > 660) {
    slidesPerView = 6
  } else if (window.innerWidth > 1440 && window.innerWidth <= 1680) {
    slidesPerView = 7;
  } else if (window.innerWidth > 1680 && window.innerWidth <= 1920 ) {
    slidesPerView = 8;
  }

  /** Свайпер */
  const swiper = <CustomSwiper
    spaceBetween={15}
    mobileSpaceBetween={0}
    freeMode={false}
    slidesPerView={slidesPerView}>
    {list}
  </CustomSwiper>;

  return (
    <>
      {items && items.length > 0 ? (
        <>
          {swiper}
          {/*{showDropdown && (*/}
          {/*  <Tooltip toggleTooltip={handleToggleDropdown} position='left'>*/}
          {/*    <ShowMoreMenu*/}
          {/*      iIncomeRequests={assessmentsCount.lInboxCount}*/}
          {/*      iIncomeRates={assessmentsCount.lOutboxCount}*/}
          {/*    />*/}
          {/*  </Tooltip>*/}
          {/*)}*/}
        </>
      ) : (
        flag ? <NotificationBanner /> : <UserPreloader/>
      )}
    </>
  );
};

export default HomeUsersList;
