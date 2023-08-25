import { useState } from 'react';
import MultiSelect from './MultiSelect';
import { IStoreData } from './types';
import StoreNameInput from './StoreNameInput';
import { createStore } from '../../../Utils/storeRequests';
import FileInput from './FileInput';

function NewStoreForm() {
  const [storeData, storeDataSetter] = useState<IStoreData>({
    storeName: '',
    sellers: [],
    storeLogo: null,
  });
  const [apiReturn, apiReturnSetter] = useState('');

  const disabledButton = () => {
    return storeData.storeName.length < 4;
  };

  const tryToCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createStore(storeData);
      apiReturnSetter('Loja criada com sucesso');
    } catch (erro) {
      apiReturnSetter('Erro ao criar loja');
    }
  };

  return (
    <form action="">
      <StoreNameInput
        storeDataSetter={ storeDataSetter }
        storeName={ storeData.storeName }
      />
      <MultiSelect storeDataSetter={ storeDataSetter } sellers={ storeData.sellers } />
      <FileInput storeDataSetter={ storeDataSetter } />
      <button onClick={ tryToCreate } disabled={ disabledButton() }>Finalizar</button>
      { apiReturn && <p>{ apiReturn }</p> }
    </form>
  );
}

export default NewStoreForm;
