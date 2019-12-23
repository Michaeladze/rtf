import React, { useRef } from 'react';
import './HistoryFilters.scss';
import Search from '../../../_shared/Search/Search';
import 'antd/lib/select/style/index.css';
import Select from 'antd/lib/select';

const { Option } = Select;

const HistoryFilters = React.memo(() => {
  /** Ссылка на input с поиском */
  const searchInput = useRef<HTMLInputElement>(null);

  /** Очистка поля ввода и сброс результатов поиска */
  const handleClearTextInput = () => {
    if (searchInput.current) {
      searchInput.current.value = '';
    }
  };

  // *******************************************************************************************************************

  /** Функция фильтрации по выбранной опции */
  const onFilterOptionClick = (value: any) => {
    console.log('opt', value);
    // const obj: IStatFilter = {};
    // obj[type] = [item];
    // this._store.dispatch(new ChangeStatFilters(obj));
  };

  // *******************************************************************************************************************
  /** Кнопки */
  const options = [
    {
      id: 1,
      label: 'Все',
      value: 'all'
    },
    {
      id: 2,
      label: 'Обратная связь',
      value: 'feedback'
    },
    {
      id: 2,
      label: 'Достижения',
      value: 'projects'
    }
  ];

  const optionsJSX = options.map((option) => {
    return (
      <Option
        value={option.value}
        className='history-select__dropdown'
        key={option.id}>
        {' '}
        {option.label}{' '}
      </Option>
    );
  });

  // *******************************************************************************************************************

  return (
    <div className='history-filters'>
      <div className='history-select'>
        <Select
          defaultValue='Все'
          style={{ width: 200 }}
          onChange={onFilterOptionClick}>
          {optionsJSX}
        </Select>
      </div>
      <div className='history-search'>
        <Search
          refName={searchInput}
          handleClick={handleClearTextInput}
        />
      </div>
    </div>
  );
});

export default HistoryFilters;
