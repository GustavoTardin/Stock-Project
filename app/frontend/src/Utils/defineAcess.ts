import IUser from '../components/Admin/User/edit/IUser';

const defineAcess = (user: IUser) => {
  let acess = '';

  switch (user.credential) {
    case 'Administrador':
      acess = 'Todas';
      break;
    case 'Estoquista':
      acess = 'Nenhuma';
      break;
    default:
      if (user.stores.length < 1) {
        acess = 'Ainda não trabalha em nenhuma loja';
      } else {
        acess += user.stores.join(', ');
      }
      break;
  }
  return acess;
};

export default defineAcess;
