import { ChangeEvent, useEffect, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { getUsernames } from '../../../Utils/userRequests';

type IStoreData = {
  storeName: string;
  sellers: string[];
  storeImg: File | null,
};

type IOptionType = {
  value: string;
  label: string;
};

function NewStoreForm() {
  const [storeData, storeDataSetter] = useState<IStoreData>({
    storeName: '',
    sellers: [],
    storeImg: null,
  });
  const [users, usersSetter] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    storeDataSetter((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleMultiSelectChange = (selected: MultiValue<IOptionType>) => {
    storeDataSetter((prevData) => ({
      ...prevData,
      sellers: selected.map((option) => option.value),
    }));
  };

  const handleFileInput = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFile = files[0];

      storeDataSetter((prevData) => ({
        ...prevData,
        storeImg: selectedFile,
      }));
    }
  };

  useEffect(() => {
    const getNames = async () => {
      const userNames = await getUsernames();
      usersSetter(userNames);
    };
    getNames();
  }, []);

  const options = users.map((user) => ({
    value: user,
    label: user,
  }));

  return (
    <form action="">
      <label htmlFor="storeName">
        Nome da loja
        <input
          type="text"
          placeholder="Nome da loja"
          id="storeName"
          value={ storeData.storeName }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="salesPeople">
        Vendedores
      </label>
      <Select
        id="salesPeople"
        isMulti
        options={ options }
        onChange={ (selected) => {
          handleMultiSelectChange(selected);
        } }
        value={ options.filter((option) => storeData.sellers.includes(option.value)) }
        isClearable
      />

      <label htmlFor="storeImg">Logo da loja</label>
      <input
        type="file"
        id="storeImg"
        accept="image/png"
        onChange={ (e) => { handleFileInput(e.target.files); } }
      />

    </form>
  );
}

export default NewStoreForm;
