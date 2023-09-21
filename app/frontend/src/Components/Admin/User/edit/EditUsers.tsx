import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import { deleteUser, getUsers } from '../../../../Utils/userRequests';
import IUser from './IUser';
import DelConfirmation from './DelConfirmation';

function EditUsers() {
  const [users, usersSetter] = useState<IUser[]>([]);
  const [delMessage, delMessageSetter] = useState('');
  const [showModal, toggleModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [indexToDelete, setIndex] = useState<number>(users.length);

  const userInfo = useAuthUser() as () => AuthStateUserObject;
  const { id } = userInfo();
  const signOut = useSignOut();

  const tryDelete = async () => {
    try {
      await deleteUser(idToDelete);
      if (id === idToDelete as string) signOut();
      const updatedUsers = users.filter((_e, i) => i !== indexToDelete);
      usersSetter(updatedUsers);
    } catch {
      delMessageSetter('Não foi possivel excluir o usuário');
    }
  };

  const handleDelete = (deletedId: string, index: number) => {
    setIdToDelete(deletedId);
    setIndex(index);
    toggleModal(true);
  };

  useEffect(() => {
    const userGetter = async () => {
      const response = await getUsers();
      usersSetter(response);
    };
    userGetter();
  }, []);
  return (
    <div>
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
                <button onClick={ () => handleDelete(e.id, i) }>
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
      <DelConfirmation
        tryDelete={ tryDelete }
        showModal={ showModal }
        toggleModal={ toggleModal }
      />
    </div>
  );
}

export default EditUsers;
