import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import ReactModal from 'react-modal';
import { deleteUser, getUsers } from '../../../../Utils/Requests/userRequests';
import IUser from './IUser';
import DelConfirmation from './DelConfirmation';
import defineAccess from '@/Utils/defineAccess';

function EditUsers() {
  const [users, usersSetter] = useState<IUser[]>([]);
  const [delMessage, delMessageSetter] = useState('');
  const [showModal, toggleModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [indexToDelete, setIndexToDelete] = useState<number>(users.length);

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
      delMessageSetter('Não foi possível excluir o usuário');
    }
  };

  const handleDelete = (deletedId: string, index: number) => {
    setIdToDelete(deletedId);
    setIndexToDelete(index);
    toggleModal(true);
  };

  useEffect(() => {
    const userGetter = async () => {
      const response = await getUsers();
      usersSetter(response);
    };
    userGetter();
    ReactModal.setAppElement('#root');
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
          const storeAccess = defineAccess(e);

          return (
            <tr key={ e.id } id={ e.id }>
              <td>{e.userName}</td>
              <td>{e.credential}</td>
              <td>{storeAccess || e.stores}</td>
              <td>
                <button onClick={ () => handleDelete(e.id, i) }>
                  <FontAwesomeIcon icon={ faTrash } />
                </button>
                <button>
                  <FontAwesomeIcon icon={ faEdit } />
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
