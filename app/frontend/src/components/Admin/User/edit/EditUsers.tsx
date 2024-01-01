import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';

function EditUsers() {

  const userInfo = useAuthUser() as () => AuthStateUserObject;
  const { id } = userInfo();
  const signOut = useSignOut();

  // const tryDelete = async () => {
  //   try {
  //     await deleteUser({id: idToDelete, token});
  //     if (id === idToDelete as string) signOut();
  //     const updatedUsers = users.filter((_e, i) => i !== indexToDelete);
  //     usersSetter(updatedUsers);
  //   } catch {
  //     delMessageSetter('Não foi possível excluir o usuário');
  //   }
  // };

  const handleChange = () => {
    // setIndexToDelete(index);
    // toggleModal(true);
  };

  const users = [
    {id: 1, firstName: 'Richard', lastName: 'Machado', credentialName: 'Root', active: true},
    {id: 2, firstName: 'Gustavo', lastName: 'Tardin', credentialName: 'Admin', active: true},
    {id: 3, firstName: 'Seu Joaquin', lastName: 'da Silva', credentialName: 'Estoquista', active: false},
    {id: 4, firstName: 'Guilherme', lastName: 'Tardin', credentialName: 'Lojista', active: true},
  ]
  const stores = [
    { id: 1, name: " loja 1" },
    { id: 2, name: " loja 2" },
    { id: 3, name: " loja 3" },
  ]
  // useEffect(() => {
//     const userGetter = async () => {
//       const response = await getUsers();
//       console.log(response)
//       // usersSetter(response);
//     };
//     userGetter();
//     ReactModal.setAppElement('#root');
//   }, []);
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Função</th>
            <th>Lojas</th>
          </tr>
        </thead>
        <tbody>
          {users.map((e) => (
            <tr key={e.id}>
              <td>{`${e.firstName} ${e.lastName}`}</td>
              <td>{e.credentialName}</td>
              <tr>
                {e.credentialName === 'Lojista' && stores.map(store => (
                  <td key={store.id}>
                    <input
                      id={store.id.toString()}
                      checked={store.id === 1}
                      className="transition duration-150 w-4 h-4 hover:ring-2 focus:accent-blueDetails accent-yellowDetails ring-yellowDetails focus:ring-blueDetails focus:ring-2"
                      type="checkbox" name='stores' value={store.id}
                      onChange={handleChange}
                    /> 
                    <label htmlFor={store.id.toString()}>{store.name}</label>
                  </td>
                ))}
              </tr>
              {/* <td>{<Button onChange={handleActive(e.active)} >Inativo</Button>}</td>
              <td>{<Button onChange={handleActive(e.active)} >Inativo</Button>}</td> */}
            </tr>
            ))}
        </tbody>
      </table>
    </section>
  )     
}

export default EditUsers
        