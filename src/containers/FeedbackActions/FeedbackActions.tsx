import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import { FeedbackActionsMain } from './FeedbackActionsMain/FeedbackActionsMain';
import { FeedbackActionsAside } from './FeedbackActionsAside';
import ViewContainer from '../_shared/ViewContainer';

const FeedbackActions: React.FC = () => {
  /** Отображение разных заголовков в зависимости от типа фидбека */
  const { location } = useReactRouter();
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(
      location.pathname.indexOf('feedback-provide') >= 0
        ? `Оставить ${'\n'}обратную связь`
        : `Запросить ${'\n'}обратную связь`
    );
  }, [location.pathname]);

  return (
    <ViewContainer>
      <CommonContainer
        mainTitle={title}
        asideComponent={<FeedbackActionsAside/>}
        mainComponent={<FeedbackActionsMain/>}
      />
    </ViewContainer>
  );
};

export default FeedbackActions;
