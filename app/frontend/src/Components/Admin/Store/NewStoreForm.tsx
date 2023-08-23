import { ChangeEvent, useEffect, useState } from 'react';
import { getUsernames } from '../../../Utils/userRequests';

function NewStoreForm() {
  const [storeData, storeDataSetter] = useState({
    storeName: '',
    sellers: [],
    color: '',
  });
  const [users, usersSetter] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    storeDataSetter((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    const getNames = async () => {
      const userNames = await getUsernames();
      usersSetter(userNames);
      console.log(userNames);
    };
    getNames();
  }, []);

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
    </form>
  );
}

export default NewStoreForm;
