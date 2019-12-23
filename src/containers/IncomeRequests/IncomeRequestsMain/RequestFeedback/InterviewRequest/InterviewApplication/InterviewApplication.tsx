import React from 'react';
import './InterviewApplication.scss';
import { IInterviewUser } from '../../../../../../_store/interfaces/sberprofi.interface';
import UserTitle from '../../../../../../components/UserTitle';
import ProfiExpertise from '../../ProfiRequest/ProfiExpertise/ProfiExpertise';

interface IProps {
  item: IInterviewUser;
}

const InterviewApplication: React.FC<IProps> = ({ item }) => {
  return (
    <div className='application'>
      <div className='application__col'>
        <UserTitle user={item.oUser}/>
        <p className="application__block">{item.oUser.sExtidFblock}</p>
        {/*<div className='application__emails'>*/}
        {/*  <a className='application__link'>{item.oUser.sUserId}</a>*/}
        {/*  <a className='application__link'>{item.oUser.sUserId}</a>*/}
        {/*</div>*/}
        <div className='application__expertise'>
          <ProfiExpertise from={item.oCurrentMastershipRate} to={item.oTargetMastershipRate} showMore={false}/>
        </div>
      </div>
      <div className='application__col'>
        <h3 className='application__title'>Инструменты оценки</h3>

        {item.oSelfRate.sLevelTitle && <div className="application__instrument">
          <div className="application__instrument-label">Самооценка</div>
          <div className="application__instrument-value">
            <span className='instrument-value--text'>{item.oSelfRate.sLevelTitle}</span>
            {/*<span className='instrument-value--more'>Подробнее</span>*/}
          </div>
        </div>}

        {item.aInterviewMastershipResults.length > 0 && <div className="application__instrument">
          <div className="application__instrument-label">Коллеги</div>
          <div className="application__instrument-value">
            <span className='instrument-value--text'>{item.aInterviewMastershipResults[0].sLevelTitle}</span>
            {/*<span className='instrument-value--more'>Подробнее</span>*/}
          </div>
        </div>}

        {item.aTestingResult.length > 0 && <div className="application__instrument">
          <div className="application__instrument-label">Тестирование</div>
          <div className="application__instrument-value">
            <span
              className='instrument-value--text'>{item.aTestingResult[0].sLevelTitle}</span>
            {/*<span className='instrument-value--more'>Подробнее</span>*/}
          </div>
        </div>}
      </div>
    </div>
  );
};

export default InterviewApplication;
