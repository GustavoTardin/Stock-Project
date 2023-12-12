import { useEffect, useState } from 'react';
import NewUserForm from '../../components/Admin/User/creation/NewUserForm';
import EditUsers from '../../components/Admin/User/edit/EditUsers';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { PrintData } from '@/components/PopUp/PrintData';
import { UpdatePassword } from '@/components/Admin/User/edit/UpdatePassword';

function UserManagement() {
  const [isCreate, setIsCreate] = useState(false);
  const [isButtonSm, setIsButtonSm] = useState(false);
  const [isDataFetch, setIsDataFetch] =useState(false)
  const [edit, setEdit] = useState(false);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false)

  useEffect(() => {
    let count = 6
    if (isDataFetch) {
      const timer = setInterval(() => {
        count -= 1
        console.log(count);
        if(count < 1){
          setIsDataFetch(false)
        }
      }, 1000);

      return () => clearInterval(timer);
    }
    console.log('a');
    
  }, [isDataFetch]);

  const showForm = () => {
    setEdit(false)
    setIsUpdatePassword(false)
    setIsCreate((prev) => !prev);
  };

  const showEdit = () => {
    setIsButtonSm((prev) => !prev);
    setEdit((prev) => !prev);
    setIsCreate(false);
  };

  const showUpdatePassword = () => {
    setIsCreate(false);
    setIsUpdatePassword((prev) => !prev);
  };

  useEffect(() => {
    setIsButtonSm(isUpdatePassword || isCreate)
  },[isUpdatePassword, isCreate])

  return (
    <>
      {isDataFetch && PrintData({status: 'loading'})}
      <div  className="flex flex-col h-screen w-screen">
        <Header/>
        <section className={`flex-grow flex justify-center ${
          isButtonSm ? 'items-center flex-col' : 'items-center'
        }`}>
          <div className={isButtonSm ? 'h-32 pt-10' : ''}>
            <Button
              className={`cursor-pointer hover:bg-blueDetails hover:text-white active:bg-darkBlueDetails rounded-xl ${
                isButtonSm ? 'h-10 m-1 w-52 bg-primary': 'm-2 w-72 h-72 bg-yellowDetails text-xl'
              }`}
              onClick={ showForm }
              >
              Criar novo colaborador
            </Button>
            <Button 
              className={`cursor-pointer hover:bg-blueDetails hover:border-blueDetails hover:text-white active:bg-darkBlueDetails rounded-xl ${
                isButtonSm ? 'h-10 m-1 w-52 text-primary border-2 border-primary': 'm-2 h-72 w-72 text-yellowDetails  border-4 border-yellowDetails text-xl'
              }`}
              onClick={ showEdit }
              >
              Administrar colaboradores
            </Button>
            <Button 
              className={`cursor-pointer hover:bg-blueDetails hover:border-blueDetails hover:text-white active:bg-darkBlueDetails rounded-xl ${
                isButtonSm ? 'h-10 m-1 w-52 text-primary border-2 border-primary': 'm-2 h-72 w-72 text-yellowDetails  border-4 border-yellowDetails text-xl'
              }`}
              onClick={ showUpdatePassword }
              >
              Atualizar senha
            </Button>
          </div>
            {isCreate && (
              <>
                <h3 
                  className='max-w-100 text-2xl text-yellowDetails py-5'
                >
                  Preencher dados novo usuário
                </h3>
                <div className=' w-full flex-grow'>
                  <NewUserForm  setIsDataFetch={setIsDataFetch}/>
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
                <div className=' w-full flex-grow'>
                  <UpdatePassword />
                </div>
              </>
            )}
            { edit && (
              <EditUsers />
            )}

        </section>
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
