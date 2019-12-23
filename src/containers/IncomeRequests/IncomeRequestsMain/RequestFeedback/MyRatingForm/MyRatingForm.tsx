import React, { useState } from 'react';
import './MyRatingForm.scss';
import FormRow from '../../../../../_reactShared/ui/sberq/atoms/FormRow/FormRow';
import Textarea from '../../../../../_reactShared/ui/sberq/atoms/Textarea/Textarea';
import { array, object, string } from 'yup';
import { useForm } from '../../../../../_reactShared/hooks/form';
import StandardButton from '../../../../../components/StandardButton';
import { CanNotRatePopup, ICanNotAnswer } from '../../../../popups/CanNotRatePopup/CanNotRatePopup';
import { animateExit } from '../../../../../_helpers/helpers';
import Modal from 'antd/lib/modal';
import { ReactComponent as CloseIcon } from '../../../../../_assets/svg/close.svg';
import PopupMobileWrapper from '../../../../_shared/PopupMobileWrapper/PopupMobileWrapper';
import { IInterviewQuestion, ISPAnswer } from '../../../../../_store/interfaces/sberprofi.interface';
import { useDispatch } from 'react-redux';
import { IStringMap } from '../../../../../_store/store.interface';
import {
  CanNotAnswerEstimate,
  CanNotAnswerInterview,
  SaveEstimateFrom,
  SaveInterviewFrom,
  SendEstimateResponse,
  SendInterviewResponse
} from '../../../../../_store/actions/users-request.action';
import useReactRouter from 'use-react-router';
import Select from '../../../../../_reactShared/ui/sberq/molecules/Select/Select';

interface IProps {
  /** Вопросы */
  fields: IInterviewQuestion[];
  /** Объект запроса */
  request: any;
  /** Тип запроса */
  type: 'interview' | 'sberprofi';
}

const MyRatingForm: React.FC<IProps> = ({ fields, request, type }) => {
  const dispatch = useDispatch();
  const { match } = useReactRouter();

  // ================================================================================================================

  /** Начальные значения */
  const initialValues = [fields.reduce((acc, item) => {

    let option;

    if (item.sType === 'ANSWER_WITH_RADIO') {
      const index = item.aAnswers.findIndex((a) => a.sOption.bSelected);
      option = {
        iKey: index >= 0 ? +item.aAnswers[index].sOption.sId : -1,
        sValue: index >= 0 ? item.aAnswers[index].sOption.sText : 'Выберите значение'
      }
    }


    if (item.sType === 'ANSWER_WITH_OPTION') {
      const selected = item.aAnswers.filter((a) => a.sOption.bSelected);
      if (selected.length > 0) {
        option = selected.map((e) => ({
          iKey: +e.sOption.sId,
          sValue: e.sOption.sText,
          bSelected: e.sOption.bSelected,
        }))
      } else {
        option = [{
          iKey: -1,
          sValue: 'Выберите значение',
          bSelected: false
        }]
      }
    }

    return {
      ...acc,
      [`sQuestion${item.sId}`]: item.sType === 'ANSWER_WITH_TEXT' ?
        (item.aAnswers.length > 0 && item.aAnswers[0].sComment) || '' : option,
      [`meta_sQuestion${item.sId}`]: item
    }
  }, {})];


  /** Собираем валидацию */
  const validation = fields.reduce((acc, item) => item.sType === 'ANSWER_WITH_TEXT' ?
    { ...acc, [`sQuestion${item.sId}`]: string().required('Не заполнено обязательное поле') } : acc, {});

  /** Схема для валидирования */
  let schema = array().of(
    object().shape(validation)
  );

  /** Описание формы, подписка, валидация и начальное состояние каждого поля в форме */
  const { mainSubject, validate, refForm } = useForm({
    initialValues,
    schema
  });

  /** Собираем данные */
  const getBody = () => {
    const data = mainSubject.getValue()[0];
    console.log(data);

    let result = {
      sId: request.sId,
      oCurrentMastershipRate: {
        sId: type === 'sberprofi' ? request.oCurrentMastershipRate.sId : request.oUserEstimateCard.oCurrentMastershipRate.sId
      },
      aQuestions: Object.entries(data).filter((q) => !q[0].includes('meta')).map((entries: any) => {

        let aAnswers = [];

        if (data[`meta_${entries[0]}`].sType === 'ANSWER_WITH_TEXT') {
          aAnswers.push({ sComment: data[`${entries[0]}`] })
        }

        if ((data[`meta_${entries[0]}`].sType === 'ANSWER_WITH_RADIO')) {
          const array = data[`meta_${entries[0]}`].aAnswers;
          aAnswers = array.map(({ sOption }: any) => {
            return { sOption: { sId: sOption.sId, bSelected: +sOption.sId === data[`${entries[0]}`].iKey } }
          });
        }

        if ((data[`meta_${entries[0]}`].sType === 'ANSWER_WITH_OPTION')) {
          aAnswers = data[`${entries[0]}`].map((e: { iKey: string | number; sValue: string, bSelected?: boolean }) => ({
            sOption: {
              sId: e.iKey,
              bSelected: true
            }
          }));
        }

        return {
          ...data[`meta_${entries[0]}`],
          aAnswers
        }
      })
    };

    if (type === 'sberprofi') {
      result = {
        ...result,
        // @ts-ignore
        aEstimatorAttribute: request.aEstimatorAttribute,
        aEstimatorSkill: request.aEstimatorSkill,
        oTargetMastershipRate: { sId: request.oTargetMastershipRate.sId }
      }
    }

    return result;
  };

  /** Отправить форму */
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const sId = (match.params as { requestId: string }).requestId;

      const actions: IStringMap<string> = {
        interview: SendInterviewResponse.Pending,
        sberprofi: SendEstimateResponse.Pending
      };


      dispatch({ type: actions[type], payload: { body: getBody(), sId } })
    }
  };

  /** Сохранить форму */
  const saveForm = () => {

    const actions: IStringMap<string> = {
      interview: SaveInterviewFrom.Pending,
      sberprofi: SaveEstimateFrom.Pending
    };

    dispatch({ type: actions[type], payload: getBody() })
  };

  // ================================================================================================================

  /** Поля формы */
  const formFields =
    mainSubject &&
    mainSubject.getValue().map((item, i) => (
      <div key={i}>
        {
          Object.entries(item).filter((q) => !q[0].includes('meta')).map((entries: any) => {
            const sId = entries[0];

            if (item[`meta_${sId}`]) {
              if (item[`meta_${sId}`].sType === 'ANSWER_WITH_RADIO') {
                const options = item[`meta_${sId}`].aAnswers.map((a: ISPAnswer) => ({
                  iKey: a.sOption && +a.sOption.sId,
                  sValue: a.sOption && a.sOption.sText,
                  bSelected: a.sOption && a.sOption.bSelected
                }));

                return <FormRow key={sId}>
                  <Select
                    errorMessage={item[`${sId}_error`]}
                    data-form-field={`${sId}`}
                    defaultValue={item[`${sId}`]}
                    labelText={item[`meta_${sId}`].sTitleName}
                    selectOptions={options}/></FormRow>
              }

              if (item[`meta_${sId}`].sType === 'ANSWER_WITH_OPTION') {
                const options = item[`meta_${sId}`].aAnswers.map((a: ISPAnswer) => ({
                  iKey: a.sOption && +a.sOption.sId,
                  sValue: a.sOption && a.sOption.sText,
                  bSelected: a.sOption && a.sOption.bSelected
                }));

                return <FormRow key={sId}><Select
                  errorMessage={item[`${sId}_error`]}
                  data-form-field={`${sId}`}
                  defaultValue={item[`${sId}`]}
                  labelText={item[`meta_${sId}`].sTitleName}
                  multi={true}
                  selectOptions={options}
                /></FormRow>
              }

              if (item[`meta_${sId}`].sType === 'ANSWER_WITH_TEXT') {
                return <FormRow key={sId}><Textarea
                  textAreaClassName='my-form__textarea'
                  errorMessage={item[`${sId}_error`]}
                  data-form-field={`${sId}`}
                  defaultValue={item[`${sId}`]}
                  labelText={item[`meta_${sId}`].sTitleName}
                  placeholderText={item[`meta_${sId}`].sDescription}
                /></FormRow>
              }
            }

            return <></>
          })
        }
      </div>
    ));

  // ================================================================================================================

  /** ------------------------------------------------------------------------------------------------------------------
   * Отображение попапа 'Не могу оценить'
   ------------------------------------------------------------------------------------------------------------------ */
  const [showCanNotRatePopup, toggleCanNotRatePopup] = useState(false);

  const openCanNotRateDialog = () => {
    toggleCanNotRatePopup(true);
  };

  const handleCanNotRateOk = (form: ICanNotAnswer) => {
    const sId = (match.params as { requestId: string }).requestId;

    const actions: IStringMap<string> = {
      interview: CanNotAnswerInterview.Pending,
      sberprofi: CanNotAnswerEstimate.Pending
    };

    dispatch({
      type: actions[type], payload: {
        body: {
          sId: getBody().sId,
          sCanNotAnswerType: form.sCanNotAnswerType,
          sCanNotAnswerText: form.sCanNotAnswerText || ''
        }, sId
      }
    });

    toggleCanNotRatePopup(false);
  };

  const handleCanNotRateCancel = () => {
    animateExit(() => toggleCanNotRatePopup(false));
  };

  const canNotRateJSX = (
    <Modal
      closeIcon={<CloseIcon/>}
      visible={showCanNotRatePopup}
      footer={null}
      onCancel={handleCanNotRateCancel}
      width={470}
      className='custom-modal'>
      <PopupMobileWrapper handleClose={handleCanNotRateCancel}>
        <CanNotRatePopup
          title={'С чем вызваны сложности в оценке?'}
          onOk={handleCanNotRateOk}
          onCancel={handleCanNotRateCancel}
        />
      </PopupMobileWrapper>
    </Modal>
  );


  return (
    <form ref={refForm} onSubmit={submitForm} className='my-rating__form'>

      <h2 className='my-rating__title'>Ваша оценка</h2>

      {formFields}

      <div className='profi__footer'>
        <StandardButton buttonType='submit' customClass='profi__footer-button' type='primary' handler={() => {
        }} value='Отправить'/>
        <StandardButton customClass='profi__footer-button' type='secondary' handler={saveForm} value='Сохранить'/>
        <StandardButton customClass='profi__footer-button' type='secondary' handler={openCanNotRateDialog}
          value='Не могу оценить'/>
      </div>

      {canNotRateJSX}

    </form>
  );
};

export default MyRatingForm;
