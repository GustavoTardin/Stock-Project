import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { IOptionType } from '../../Store/types';
import { getStoreNames } from '../../../../Utils/storeRequests';
import TNewUser from './TypeNewUser';

function MultiSelect({ userDataSetter, stores }: {
  userDataSetter: React.Dispatch<React.SetStateAction<TNewUser>>,
  stores: string[], }) {
  const [storeNames, storeNamesSetter] = useState([]);

  const handleMultiSelectChange = (selected: MultiValue<IOptionType>) => {
    userDataSetter((prevData) => ({
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
      storeNamesSetter(names);
    };
    getStores();
  }, []);

  return (

    <label htmlFor="stores">
      Trabalha na(s) loja(s):

      <Select
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

  );
}

export default MultiSelect;
