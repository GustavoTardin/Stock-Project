import IUser from '../components/Admin/User/edit/IUser';

const defineAccess = (user: IUser) => {
  let access = '';
  
  switch (user.credentialName) {
    case 'Admin':
      access = 'Todas';
      break;
    case 'Estoquista':
      access = 'Nenhuma';
      break;
    case 'Root':
      access = 'Nenhuma';
      break;
    default:
      if (user.stores.length < 1) {
        access = 'Ainda não trabalha em nenhuma loja';
      } else {
        access += user.stores.join(', ');
      }
      break;
  }
  return access;
};

export default defineAccess;
