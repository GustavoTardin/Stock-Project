import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { getUsernames } from '../../../Utils/userRequests';
import { IOptionType, IStoreData } from './types';

function MultiSelect({ storeDataSetter, sellers }: {
  storeDataSetter: (value: React.SetStateAction<IStoreData>) => void,
  sellers: string[], }) {
  const [users, usersSetter] = useState([]);

  const handleMultiSelectChange = (selected: MultiValue<IOptionType>) => {
    storeDataSetter((prevData) => ({
      ...prevData,
      sellers: selected.map((option) => option.value),
    }));
  };

  const options = users.map((user) => ({
    value: user,
    label: user,
  }));

  useEffect(() => {
    const getNames = async () => {
      const userNames = await getUsernames();
      usersSetter(userNames);
    };
    getNames();
  }, []);

  return (

    <label htmlFor="salesPeople">
      Vendedores

      <Select
        id="salesPeople"
        isMulti
        placeholder="Vendedores"
        options={ options }
        onChange={ (selected) => {
          handleMultiSelectChange(selected);
        } }
        value={ options.filter((option) => sellers.includes(option.value)) }
        isClearable
      />
    </label>

  );
}

export default MultiSelect;
