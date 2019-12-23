import React, { useState } from 'react';
import './ProfiQuestion.scss';
import { ReactComponent as Arrow } from '../../../../../../_assets/svg/dropdown-arrow.svg';
import { ISPAnswerOption, ISPQuestion } from '../../../../../../_store/interfaces/sberprofi.interface';

interface IProps {
  item: ISPQuestion;
}

const ProfiQuestion: React.FC<IProps> = ({ item }) => {

  /** Свернуть/Развернуть */
  const [showBody, setShowBody] = useState(false);

  /** Ответ. Выбираем bSelected из вариантов, иначе единственный элемент */
  let answer: string = '';
  if (item.aAnswers.length > 0) {
    if (item.sType === 'ANSWER_WITH_TEXT') {
      answer = item.aAnswers[0].sComment || '';
    }

    if (item.sType === 'ANSWER_WITH_RADIO') {
      const a = item.aAnswers.find((answer) => !!(answer.sOption as ISPAnswerOption).bSelected);
      answer = a && a.sOption ? a.sOption.sText : '';
    }

    if (item.sType === 'ANSWER_WITH_OPTION') {
      const a = item.aAnswers
        .filter((a) => !!(a.sOption as ISPAnswerOption).bSelected)
        .map((a) => a && a.sOption ? a.sOption.sText : '');
      answer = a.join(', ');
    }
  }

  return (
    <div className='profi__question'>
      <div className='profi__question-row' onClick={() => setShowBody(!showBody)}>
        <p className='profi__question-label'>{item.sTitleName}</p>
        <button type='button' className={`profi__question-arrow ${showBody ? 'rotate' : ''}`}>
          <Arrow/>
        </button>
      </div>

      {showBody && <div className="profi__question-body">
        <p className="profi__question-text"> {answer} </p>
      </div>}
    </div>
  );
};

export default ProfiQuestion;
