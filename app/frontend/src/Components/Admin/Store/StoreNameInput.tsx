import { ChangeEvent } from 'react';
import { IStoreData } from './types';

function StoreNameInput({ storeDataSetter, storeName }: {
  storeDataSetter: (value: React.SetStateAction<IStoreData>) => void,
  storeName: string }) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    storeDataSetter((prevData) => ({
      ...prevData,
      storeName: value,
    }));
  };

  return (

    <label htmlFor="storeName">
      Nome da loja
      <input
        type="text"
        placeholder="Nome da loja"
        id="storeName"
        value={ storeName }
        onChange={ handleChange }
        autoComplete="new-store"
      />
    </label>
  );
}

export default StoreNameInput;
