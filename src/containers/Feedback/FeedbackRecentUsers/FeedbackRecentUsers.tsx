import React from 'react';
import './FeedbackRecentUsers.scss';
import { IUser } from '../../../_store/reducers/users-all.reducer';
import { FeedbackUserCard } from '../FeedbackUserCard/FeedbackUserCard';
import CustomSwiper from '../../_shared/CustomSwiper/CustomSwiper';
import { useDispatch } from 'react-redux';
import {
  DeleteFromRecent,
  SetPinForRecent
} from '../../../_store/actions/users-recent.action';

interface IFeedbackRecentUsersProps {
  users: IUser[];
  onClick: (user: IUser) => void;
}

export const FeedbackRecentUsers: React.FC<IFeedbackRecentUsersProps> = ({
  users,
  onClick
}) => {
  const dispatch = useDispatch();

  /** Запинивание пользователя */
  const handlePin = (user: IUser) => {
    dispatch({ type: SetPinForRecent.Pending, payload: { currentUser: user } });
  };

  /** Удаление пользователя из списка */
  const handleDelete = (user: IUser) => {
    dispatch({
      type: DeleteFromRecent.Pending,
      payload: { currentUser: user }
    });
  };

  /** Последние запрашиваемые пользователи */
  const aRecentUsers = users.map((item) => (
    <div
      className='feedback-recent__slide'
      key={item.sUserId}
      onClick={() => onClick(item)}>
      <FeedbackUserCard
        isFav={false}
        onPin={handlePin}
        onDelete={handleDelete}
        user={item}
      />
    </div>
  ));

  return (
    <>
      <div className='feedback-recent-users'>
        <CustomSwiper
          spaceBetween={8}
          mobileSpaceBetween={0}
          slidesPerView={7}>
          {aRecentUsers}
        </CustomSwiper>
      </div>
    </>
  );
};
