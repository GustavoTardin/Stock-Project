import { useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { getUsernames } from '../../../Utils/userRequests';
import { IOptionType, IStoreData } from './types';

function MultiSelect({ userDataSetter, stores }: {
  userDataSetter: (value: React.SetStateAction<IStoreData>) => void,
  stores: string[], }) {
  const [users, usersSetter] = useState([]);

  const handleMultiSelectChange = (selected: MultiValue<IOptionType>) => {
    userDataSetter((prevData) => ({
      ...prevData,
      stores: selected.map((option) => option.value),
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
        value={ options.filter((option) => stores.includes(option.value)) }
        isClearable
      />
    </label>

  );
}

export default MultiSelect;
