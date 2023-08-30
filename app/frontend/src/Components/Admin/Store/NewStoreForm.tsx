import { useEffect, useState } from 'react';
import axios from 'axios';
import { IStoreData } from './types';
import StoreNameInput from './StoreNameInput';
import { createStore } from '../../../Utils/storeRequests';
import FileInput from './FileInput';

function NewStoreForm() {
  const [storeData, storeDataSetter] = useState<IStoreData>({
    storeName: '',
    storeLogo: null,
  });
  const [apiReturn, apiReturnSetter] = useState('');

  const disabledButton = () => {
    return storeData.storeName.length < 4;
  };

  const tryToCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', storeData.storeName);
    if (storeData.storeLogo) {
      formData.append('storeLogo', storeData.storeLogo as File);
    }
    try {
      await createStore(formData, storeData.storeLogo ? 'store' : null);
      apiReturnSetter('Loja criada com sucesso');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        apiReturnSetter(errorMessage);
      }
    }
  };

  useEffect(() => { apiReturnSetter(''); }, [storeData]);

  return (
    <form action="">
      <StoreNameInput
        storeDataSetter={ storeDataSetter }
        storeName={ storeData.storeName }
      />
      <FileInput storeDataSetter={ storeDataSetter } />
      <button onClick={ tryToCreate } disabled={ disabledButton() }>Criar</button>
      { apiReturn && <p>{ apiReturn }</p> }
    </form>
  );
}

export default NewStoreForm;
