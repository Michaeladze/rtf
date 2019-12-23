import React from 'react';
import CommonContainer from '../_shared/CommonContainer/CommonContainer';
import { FeedbackMain } from './FeedbackMain';
import ViewContainer from '../_shared/ViewContainer';

const Feedback: React.FC = () => {

  return <ViewContainer>
    <CommonContainer
      mainComponent={<FeedbackMain/>}
      mainTitle={'Коллеги'}
      subtitle='Обратная связь по компетенциям и профессиональным навыкам'
    />
  </ViewContainer>;
};

export default Feedback;
