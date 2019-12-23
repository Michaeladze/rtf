import React from 'react';
import './UserImage.scss';

interface IUserImageProps {
  userId: string | undefined;
}

const UserImage: React.FC<IUserImageProps> = ({ userId }) => {
  const photoUrl = process.env.REACT_APP_PHOTO_HOST || '';

  return (
    <div
      className='rtf__user-image'
      style={{ backgroundImage: `url(${photoUrl}/userphoto/get/${userId})` }}
    />
  );
};

export default UserImage;
