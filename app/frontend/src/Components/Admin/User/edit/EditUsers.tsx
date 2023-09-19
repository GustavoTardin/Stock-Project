import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteUser, getUsers } from '../../../../Utils/userRequests';
import IUser from './IUser';

function EditUsers() {
  const [users, usersSetter] = useState<IUser[]>([]);
  const [delMessage, delMessageSetter] = useState('');

  const tryDelete = async (id: string, index: number) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((_e, i) => i !== index);
      usersSetter(updatedUsers);
    } catch {
      delMessageSetter('Não foi possivel excluir o usuário');
    }
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
                <button onClick={ () => tryDelete(e.id, i) }>
                  <FontAwesomeIcon icon={ faTrash } />
                </button>
              </td>
            </tr>
          );
        })
      }
        {
        delMessage
        && (
          <tr>
            <td style={ { color: 'red' } }>{delMessage}</td>
            <td>
              {' '}
              <button onClick={ () => delMessageSetter('') }>
                <FontAwesomeIcon icon={ faTrash } />
              </button>

            </td>
          </tr>
        )
      }
      </tbody>
    </table>
  );
}

export default EditUsers;
