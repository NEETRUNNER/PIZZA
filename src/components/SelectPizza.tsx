import Select from 'react-select';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { filteredByPrice } from '../redux/thunks/Thunks';
import { Selectors } from '../redux/selectors';

const SelectPizza: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const { currentPage } = Selectors();
    const dispatch = useDispatch<any>();

    const updateFilters = (category: string | undefined, sortBy: string | undefined, sortOrder: string | undefined) => {
      searchParams.set("sortBy", (sortBy as string));
      searchParams.set("sortOrder", (sortOrder as string))

      dispatch(filteredByPrice({page: currentPage, limit: 8, category: category, sortBy: sortBy, sortOrder: sortOrder})) // Фильтр работает корректно
      setSearchParams(searchParams);

      navigate(`/pizzas-list/${currentPage}/?category=${undefined}&sortBy=${sortBy}&sortOrder=${sortOrder}`, {replace: true})

      console.log('Сортировка по', sortBy)
      console.log('Тип сортировки', sortOrder)
    };

    const customStyles = {
        control: (base: any, state: { isFocused: any; }) => ({
          ...base,
          backgroundColor: '#f9f9f9', // Светлый фон
          borderColor: state.isFocused ? '#ff6f61' : '#d1d5db', // Изменение цвета рамки при фокусе
          boxShadow: state.isFocused ? '0 0 0 2px rgba(255, 111, 97, 0.5)' : 'none',
          borderRadius: '8px',
          padding: '4px', // Увеличенный внутренний отступ
          transition: 'all 0.3s ease',
        }),
        menu: (base: any) => ({
          ...base,
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
        }),
        option: (base: any, state: any) => ({
          ...base,
          backgroundColor: state.isSelected
            ? '#ff6f61'
            : state.isFocused
            ? '#ffe5e0'
            : '#ffffff',
          color: state.isSelected ? '#ffffff' : '#333333',
          padding: '12px 16px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }),
        singleValue: (base: any) => ({
          ...base,
          fontSize: '1rem',
          fontWeight: '600',
          color: '#333333',
        }),
        placeholder: (base: any) => ({
          ...base,
          fontSize: '1rem',
          fontWeight: '400',
          color: '#9ca3af',
        }),
    };
    
    const customTheme = (theme: any) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: '#ff6f61', // Цвет рамки при фокусе
            primary25: '#ffe5e0', // Цвет при наведении
            neutral0: '#f9f9f9', // Фон селекта
        },
    });

    interface optionType {
      value: string;
      label: string;
      sortOrder: string;
      sortBy: string;
      category: string;
    }

    const options: optionType[] = [
       {value: 'expensive', label: 'Від дорогих до дешевих', category: 'all', sortOrder: 'expensive', sortBy: 'pizza_price'},
       {value: 'cheap', label: 'Від дешевих до дорогих', category: 'all', sortOrder: 'cheap', sortBy: 'pizza_price'}
    ];

    return (
        <Select
        isSearchable={false}
        className="md:w-72 xs:w-5/6 my-4 text-black md:text-md xs:text-xm font-nunito"
        onChange={(e) => updateFilters(e?.category, e?.sortBy, e?.sortOrder)}
        options={options}
        styles={customStyles}
        theme={customTheme}
        placeholder="Оберіть фільтр"
      />
    )
}

export default SelectPizza;