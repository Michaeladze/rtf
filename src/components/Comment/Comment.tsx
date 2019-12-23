import React from 'react';
import './Comment.scss';
import ShowMoreText from '../ShowMoreText';

interface ICommentProps {
  comment: string;
  textLength?: number;
}

const Comment: React.FC<ICommentProps> = ({ comment, textLength = comment.length }) => {

  return (
    <div className='comment'>
      <div className='comment__text'>
        <ShowMoreText text={comment} textLength={textLength}/>
      </div>
    </div>
  );
};
export default Comment;
