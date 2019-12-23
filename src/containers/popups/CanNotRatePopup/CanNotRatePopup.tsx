import React, { useRef, useState } from 'react';
import './CanNotRatePopup.scss';
import StandardButton from '../../../components/StandardButton/StandardButton';
import ActionPopup from '../../_shared/ActionPopup/ActionPopup';
import 'antd/lib/radio/style/index.css';

interface ICanNotRatePopupProps {
  onCancel: () => void;
  onOk: (data: ICanNotAnswer) => void;
  title: string;
}

export interface ICanNotAnswer {
  sCanNotAnswerType: string;
  sCanNotAnswerText: string | null;
}

export const CanNotRatePopup: React.FC<ICanNotRatePopupProps> = ({ onCancel, onOk, title }) => {

  const textarea = useRef<HTMLTextAreaElement>(null);

  /** Данные для радио кнопок */
  const radioValues: ICanNotAnswer[] = [
    {
      sCanNotAnswerType: '1',
      sCanNotAnswerText: 'Не хватает информации'
    },
    {
      sCanNotAnswerType: '2',
      sCanNotAnswerText: 'Свой вариант'
    }
  ];

  /** Изменение радио кнопок */
  const [activeRadio, setActiveRadio] = useState(radioValues[0]);

  /** ---------------------------------------------------------------------------------------------------------------
   * Форма Submit
   ---------------------------------------------------------------------------------------------------------------- */
  const onSubmit = () => {
    const data = {
      sCanNotAnswerType: activeRadio.sCanNotAnswerType,
      sCanNotAnswerText: textarea.current && textarea.current.value
    };
    onOk(data);
  };

  /** Radio buttons JSX */
  const radioJSX = radioValues.map((e) =>
    <div className={`custom-radio ${activeRadio.sCanNotAnswerType === e.sCanNotAnswerType ? 'active' : ''}`}
      key={e.sCanNotAnswerType} onClick={() => setActiveRadio(e)}>
      <span className='custom-radio__text'> {e.sCanNotAnswerText} </span>
      <span className="custom-radio__circle"/>
    </div>
  );

  // ****************************************************************************************************************

  return (
    <ActionPopup titleText={title}>
      <div className='can-not-rate__popup'>
        <form>

          {radioJSX}

          {activeRadio.sCanNotAnswerType === '2' &&
          <textarea
            className='can-not-rate__input can-not-rate__input--text'
            rows={4}
            ref={textarea}
            onTouchMove={(e) => e.stopPropagation()}
            placeholder='Напишите свой комментарий'/>
          }

          <div className="can-not-rate__buttons">
            <StandardButton type='primary' handler={onSubmit} value='Завершить'/>
          </div>
        </form>
      </div>
    </ActionPopup>
  );
};
