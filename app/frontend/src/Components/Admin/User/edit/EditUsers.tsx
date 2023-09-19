import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from '../../../../Utils/userRequests';
import IUser from './IUser';

function EditUsers() {
  const [users, usersSetter] = useState<IUser[]>([]);

  const deleteUser = async (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    const userGetter = async () => {
      const response = await getUsers();
      usersSetter(response);
    };
    userGetter();
  }, []);
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Função</th>
          <th>Lojas</th>
        </tr>
      </thead>
      <tbody>
        {
        users.map((e, i) => {
          let acess = '';

          switch (e.credential) {
            case 'Administrador':
              acess = 'Todas';
              break;
            case 'Estoquista':
              acess = 'Nenhuma';
              break;
            default:
              if (e.stores.length < 1) {
                acess = 'Ainda não trabalha em nenhuma loja';
              } else {
                acess += e.stores.join(', ');
              }
              break;
          }

          return (
            <tr key={ i } id={ e.id }>
              <td>{e.userName}</td>
              <td>{e.credential}</td>
              <td>{acess || e.stores}</td>
              <td>
                <button onClick={ () => deleteUser(e.id) }>
                  <FontAwesomeIcon icon={ faTrash } />
                </button>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </table>
  );
}

export default EditUsers;
