import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { IOptionType } from '../../Store/types';
import { getStoreNames } from '../../../../Utils/Requests/storeRequests';
import TNewUser from './TypeNewUser';

function MultiSelect({ setUserData: setUserData, stores }: {
  setUserData: React.Dispatch<React.SetStateAction<TNewUser>>,
  stores: string[], }) {
  const [storeNames, setStoreNames] = useState([]);

  const handleMultiSelectChange = (selected: MultiValue<IOptionType>) => {
    setUserData((prevData) => ({
      ...prevData,
      stores: selected.map((option) => option.value),
    }));
  };

  const options = storeNames.map((user) => ({
    value: user,
    label: user,
  }));

  useEffect(() => {
    const getStores = async () => {
      const names = await getStoreNames();
      setStoreNames(names);
    };
    getStores();
  }, []);

  return (
    <div className='pt-10'>
      <label htmlFor="stores" className='text-xl'>
        Trabalha na(s) loja(s):

        <Select
          className='w-[19.5rem]'
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary:'black',
            },
            spacing: {
              ...theme.spacing,
              baseUnit:0,
              controlHeight:34,
              menuGutter:5
            } 
          })}
          id="stores"
          isMulti
          placeholder="Lojas"
          options={ options }
          onChange={ (selected) => {
            handleMultiSelectChange(selected);
          } }
          value={ options.filter((option) => stores.includes(option.value)) }
          isClearable
        />
      </label>
    </div>


  );
}

export default MultiSelect;
