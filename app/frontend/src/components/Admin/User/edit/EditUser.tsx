// import { getUserById } from "@/Service/Requests/userRequests"
// import Header from "@/components/Header"
// import axios from "axios"
// import { useEffect, useState } from "react"
// import { TUser } from "./UpdateUsers"
// import { useParams } from "react-router-dom"
import { Form } from '../../../form/index';
import { IStore } from "@/components/form/FormCheckbox"
import { FormProvider, useForm } from "react-hook-form"
import { Button } from '@/components/ui/button';

type TUpdateUserForAdmin = {
  stores: IStore[]
  active: boolean
}

interface IEditUserProps {
  id: number
  stores: number[]
  active: boolean
  credentialName: string
}
export default function EditUser(props: IEditUserProps) {
  // const { id } = useParams() as { id: string }
  // const [user, setUser] = useState<TUser>({
  //   id: 0,
  //   firstName: '',
  //   lastName: '',
  //   credentialName: '',
  //   stores: [],
  //   active: false,
  // })
  const updateUserForAdminForm = useForm({
    defaultValues: {
      active: props.active,
      stores: props.stores?.map(e => e.toString() || []),
    }
  })
  const {
    register,
    watch,
    // reset,
    // formState: { isSubmitSuccessful },
  } = updateUserForAdminForm
  const isActive = watch('active')
  const stores = [
    { id: 1, name: " loja 1" },
    { id: 2, name: " loja 2" },
    { id: 3, name: " loja 3" },
    { id: 4, name: " loja 4" },
  ]
  
  // const [checkboxes, setCheckboxes] = useState(
  //   Array.from(stores, (value) => ({
  //     id: value.id,
  //     name: value.name,
  //     checked: false
  //   }))
  // )

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try{ 
  //         const fetchUserData = await getUserById({ id: props.id })
  //         console.log(fetchUserData);
  //         setUser(fetchUserData)
  //     } catch(err) {
  //       axios.isAxiosError(err)
  //     }
  //   }
  //   fetchUser()
  // },[])

  const handleUpdateUserForAdmin = (data: TUpdateUserForAdmin) => {
    // const { stores, active } = data
     console.log(data, props.id)
  }


  return (
    <>
      {/* <h2 className="max-w-100 text-2xl text-yellowDetails py-5">Atualize o Usuário</h2> */}
        <section className='transition-all animate-enterFromRight duration-1000'>
          <FormProvider {...updateUserForAdminForm}>
            <Form.Root create={handleUpdateUserForAdmin}>
              <Form.Field className="flex flex-row justify-center items-center">
                <Form.Field className="flex flex-row mx-2 py-5 px-2 items-center bg-slate-900 text-yellowDetails font-medium rounded-l-xl">
                  O colaborador está ativo?
                  <input
                    className="transition duration-150 w-4 h-4 ml-4 hover:ring-2 text-slate-800 focus:accent-blueDetails accent-yellowDetails ring-yellowDetails focus:ring-blueDetails focus:ring-2"
                    id={`active-${props.id}`}
                    type="checkbox"
                    value="active"
                    {...register("active")}
                    />
                  <Form.Label
                    htmlFor={`active-${props.id}`}
                    className={isActive ? "ms-2 text-emerald-500" : "ms-2 text-red-500"}
                    >
                    {isActive ? 'Sim' : 'Não'}
                  </Form.Label>
                </Form.Field>
                {props.credentialName === 'Lojista' && (
                  <Form.Field className="justify-around bg-slate-900 pl-5 pr-2 w-96 mx-4 border-x-2 border-slate-800">
                    <span className="text-yellowDetails font font-medium">Qual(is) lojas ele(a) trabalha? </span>
                    <Form.Checkbox values={ stores } name={"stores"} />
                  </Form.Field>
                )}
                <Button 
                  variant="icon" 
                  className="bg-yellowDetails text-darkBlueDetails font-medium hover:text-white hover:bg-blueDetails rounded-r-xl p-5 my-1"
                  type="submit"
                  >
                  Salvar
                </Button>
              </Form.Field>
            </Form.Root>
          </FormProvider>
        </section>
    </>
  )
}

// <>
// <Header />
// <div  className="flex flex-col w-full">
//   <main className="flex-grow flex justify-center mt-20">
//     <h2 className="max-w-100 text-2xl text-yellowDetails py-5">Atualize o Usuário</h2>
//     <div className=' w-full flex-grow'>
//       <section className='bg-darkBlueDetails border-yellowDetails rounded border-2 px-80 py-12 mx-52'>
//         <FormProvider {...updateUserForAdminForm}>
//           <Form.Root create={handleUpdateUserForAdmin}>
//             <Form.Field>
//               <div className="flex justify-around w-full font-medium bg-yellowDetails p-5 ">
//                 <p className="text-darkBlueDetails">Nome</p>
//                 <p className="text-darkBlueDetails">Sobrenome</p>
//                 <p className="text-darkBlueDetails">Função</p>
//               </div>
//               <div className="grid grid-cols-3 w-full">
//                 <p>{user?.firstName}</p>
//                 <p>{user?.lastName}</p>
//                 <p>{user?.credentialName}</p>
//               </div>
//             </Form.Field>
//             <Form.Field>
//               <Form.Label htmlFor="stores">Qual(is) lojas ele(a) trabalha?</Form.Label>
//               <Form.Checkbox values={ stores } name="stores" />
//             </Form.Field>
//             <Form.Field>
//               <input
//                 className="transition duration-150 w-4 h-4 hover:ring-2 focus:accent-blueDetails accent-yellowDetails ring-yellowDetails focus:ring-blueDetails focus:ring-2"
//                 id={`active-${user.id}`}
//                 type="checkbox"
//                 value="active"
//                 {...register("active")}
//               />
//               <Form.Label
//                 className={isActive ? "ms-2 text-emerald-500" : "ms-2 text-red-500"}
//               >
//                 {isActive ? 'Sim' : 'Não'}
//               </Form.Label>
//             </Form.Field>
//             <Button size="default" type="submit">Salvar</Button>
//           </Form.Root>
//         </FormProvider>
//       </section>
//     </div>
//   </main>
// </div>