import { useEffect, useState } from 'react';
import NewUserForm from '../../components/Admin/User/creation/NewUserForm';
// import EditUsers from '../../components/Admin/User/edit/EditUsers';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { DataFetch, PrintData } from '@/components/PopUp/PrintData';
import { UpdatePassword } from '@/components/Admin/User/edit/UpdatePassword';
import { UpdateUserForm } from '@/components/Admin/User/edit/UpdateUserForm';
import { useAuthUser } from 'react-auth-kit';
import UpdateUsers from '@/components/Admin/User/edit/UpdateUsers';

function UserManagement() {
  const [isCreate, setIsCreate] = useState(false);
  const [isButtonSm, setIsButtonSm] = useState(false);
  const [dataFetch, setDataFetch] =useState<DataFetch>({ status: 'loading' })
  const [isDataFetch, setIsDataFetch] =useState(false)
  const [isEdit, setIsEdit] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false)
  const [isUpdateUsers, setIsUpdateUsers] = useState(false)
  const [userId, setUserId] = useState(0)
  const auth = useAuthUser()

  useEffect(() => {
    const user = auth()
    
    if(user) {
      setUserId(user.id)
    }
  },[])

  useEffect(() => {
    if (isDataFetch) {
      setTimeout(() => {
        setIsDataFetch(false)
      }, 5000)
    }
  }, [isDataFetch]);

  const showForm = () => {
    setIsDataFetch(true)
    setIsEdit(false)
    setIsUpdateUsers(false)
    setIsUpdatePassword(false)
    setIsCreate((prev) => !prev);
    setIsDataFetch(false)
  }


  const showUpdateUsers = () => {
    setIsDataFetch(true)
    setIsUpdatePassword(false)
    setIsCreate(false)
    setIsEdit(false)
    setIsUpdateUsers((prev) => !prev)
    setIsDataFetch(false)
  };

  const showEdit = () => {
    setIsDataFetch(true)
    setIsUpdatePassword(false)
    setIsUpdateUsers(false)
    setIsCreate(false)
    setIsEdit((prev) => !prev)
    setIsDataFetch(false)
  }

  const showUpdatePassword = () => {
    setIsDataFetch(true)
    setIsUpdateUsers(false)
    setIsEdit(false)
    setIsCreate(false);
    setIsUpdatePassword((prev) => !prev);
    setIsDataFetch(false)
  }

  useEffect(() => {
    setIsButtonSm(isUpdatePassword || isCreate || isEdit || isUpdateUsers)
  },[isUpdatePassword, isCreate, isEdit, isUpdateUsers])

  return (
    <>
      <Header/>
      {isDataFetch && PrintData(dataFetch)}
      <div  className="flex flex-col w-full">
        <main className={`flex-grow flex justify-center ${
          isButtonSm ? 'items-center flex-col mt-10' : 'items-center mt-20'
        }`}>
          <section className={isButtonSm ? 'h-32 pt-10' : ''}>
            <Button
              size={isButtonSm ? 'sm' : 'xl'}
              variant={isCreate ? 'secondary' : 'default'}
              onClick={ showForm }
            >
              Criar novo colaborador
            </Button>
            <Button
              size={isButtonSm ? 'sm' : 'xl'}
              variant={isEdit ? 'secondary' : 'default'}
              onClick={ showEdit }
            >
              Atualizar dados
            </Button>
            <Button 
              size={isButtonSm ? 'sm' : 'xl'}
              variant={isUpdateUsers ? 'secondary' : 'default'}
              onClick={ showUpdateUsers }
              >
              Administrar colaboradores
            </Button>
            <Button 
              size={isButtonSm ? 'sm' : 'xl'}
              variant={isUpdatePassword ? 'secondary' : 'default'}
              onClick={ showUpdatePassword }
              >
              Atualizar senha
            </Button>
          </section>
            {isCreate && (
              <>
                <h3 
                  className='max-w-100 text-2xl text-yellowDetails py-5'
                >
                  Preencher dados novo usuário
                </h3>
                <div className=' w-full flex-grow'>
                  <NewUserForm  setDataFetch={setDataFetch} setIsDataFetch={setIsDataFetch}/>
                </div>
              </>
            )}
            {isUpdatePassword && (
              <>
                <h3 
                  className='max-w-100 text-2xl text-yellowDetails py-5'
                >
                  Preencher dados novo usuário
                </h3>
                <section className=' w-full flex-grow'>
                  <UpdatePassword />
                </section>
              </>
            )}
            { isEdit && (
              <>
                <h3 
                  className='max-w-100 text-2xl text-yellowDetails py-5'
                >
                  Atualizar os seus dados de usuário
                </h3>
                <section className=' w-full flex-grow'>
                  <UpdateUserForm  id={userId} setDataFetch={setDataFetch} setIsDataFetch={setIsDataFetch}/>
                </section>
              </>  
            )}
            { isUpdateUsers && (
              <>
                <h3 
                  className='max-w-100 text-2xl text-yellowDetails py-5'
                >
                  Atualizar os dados dos usuários
                </h3>
                <section className=' w-full flex-grow'>
                  <UpdateUsers />
                </section>
              </>  
            )}
        </main>
      </div>
    </>
  );
}

//  <header className="bg-blue-500 p-4">
//    {/* Seu código do header aqui */}
//  </header>
//  <div className="flex-grow flex items-center justify-center">
//    <button className="bg-green-500 p-4 m-2">Botão 1</button>
//    <button className="bg-red-500 p-4 m-2">Botão 2</button>
//  </div>

export default UserManagement;
