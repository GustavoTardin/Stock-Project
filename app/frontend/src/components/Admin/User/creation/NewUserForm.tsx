import { Form } from '@/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

import { ZodType, z } from 'zod';
import { Button } from '@/components/ui/button';
import { createUser } from '../../../../Utils/Requests/userRequests';
import axios from 'axios';
import { getStoreNames } from '@/Utils/Requests/storeRequests';

export type FormData = {
  firstName: string,
  lastName: string,
  password: string,
  nickName: string,
  confirmPassword: string,
  credential: number | string,
  stores?: number[] | string[]
}

export const token = 'O Richard é o melhor'

const createUserSchema: ZodType<FormData> = z.object({
  firstName: z.string().nonempty({
    message: 'O nome é obrigatório'
  }).min(3, {
    message: 'O nome deve ter no mínimo 3 caracteres'
  }).max(15, {
    message: 'O nome deve ter no máximo 15 caracteres'
  }).transform(name => {
    return name
      .toLowerCase()
      .trim()
      .split(' ')
      .map(word => word[0].toUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  lastName: z.string().nonempty({
    message: 'O sobrenome é obrigatório'
  }).min(3, {
    message: 'O sobrenome deve ter no mínimo 3 caracteres'
  }).max(40, {
    message: 'O sobrenome deve ter no máximo 40 caracteres'
  }).transform(name => {
    return name
      .toLowerCase()
      .trim()
      .split(' ')
      .map(word => word[0].toUpperCase().concat(word.substring(1)))
      .join(' ')
  }),
  nickName: z.string().nonempty({
    message: 'o nickname login é obrigatório'
  }).min(5, {
    message: 'O Login deve ter no mínimo 5 caracteres'
  }).max(20, {
    message: 'O nome deve ter no máximo 20 caracteres'
  }),
  password: z.string().nonempty({
    message: 'A senha é obrigatória'
  }).min(5, {
    message: 'A senha deve ter no mínimo 5 caracteres'
  }).max(20, {
    message: 'A senha deve ter no máximo 20 caracteres'
  }),
  confirmPassword: z.string().nonempty({
    message: 'A senha é obrigatória'
  }).min(5, {
    message: 'A senha deve ter no mínimo 5 caracteres'
  }).max(20, {
    message: 'A senha deve ter no máximo 20 caracteres'
  }),
  credential: z.string()
  .transform(credentialId => Number(credentialId) ),
    // .transform( test => Credential[test as keyof typeof Credential]),
  stores: z.array(z.string())
    .transform( storesIds => storesIds.map( storeId => Number(storeId) ))
    .optional()
})
.refine((data) => data.password === data.confirmPassword, {
  message: "A senha de confirmação deve ser igual a senha",
  path: ["confirmPassword"],
})

export type CreateUserData = z.infer<typeof createUserSchema>


const credential = [
  {id:1, credential:'Admin'},
  {id:2, credential:'Estoquista'},
  {id:3, credential:'Lojista'},
  {id:4, credential:'Root'},
]
function NewUserForm(props: { setIsDataFetch: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [isShopAssistant, setIsShopAssistant] =useState(false)
  const [output, setOutput] = useState('')
  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  })
  const { 
    // handleSubmit, 
    formState: { isSubmitting }, 
    watch,
    // control,
    // register,
  } = createUserForm
  const userPassword = watch('password')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(userPassword)

  async function handleCreateUser(data: CreateUserData) {
    const {confirmPassword, stores, credential, ...userData} = data
    const newUser = {
      ...userData, credentialId: credential, stores,
    }
    console.log('aqui', userPassword, isPasswordStrong);
    
    try {
      if(!isShopAssistant) {
        const a = await createUser({...newUser, stores: []});

        setOutput(JSON.stringify(a.data))
      } else {
        const a = await createUser(newUser)
        setOutput(JSON.stringify(a.data))
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.message;
        setOutput(JSON.stringify(errorMessage))
    }
    }
    if(data) {
      props.setIsDataFetch(prev => !prev)
    }

  }

  const stores = [
    { id: 1, name: " loja 1" },
    { id: 2, name: " loja 2" },
    { id: 3, name: " loja 3" },
    { id: 4, name: " loja 4" },
    { id: 5, name: " loja 5" },
    { id: 6, name: " loja 6" },
    { id: 7, name: " loja 7" },
  ]


  return (
    <main className='bg-slate-900 border-yellowDetails rounded border-2 px-80 py-12 mx-52'>
      <FormProvider {...createUserForm}>
        <Form.Root create={handleCreateUser}>
          <Form.Field
            className=" grid grid-cols-2 gap-4"
          >
            <Form.Field>
              <Form.Label htmlFor="firstName">Nome</Form.Label>
              <Form.Input
                type="text"
                id="firstName"
                name="firstName"
              />
              {/* {errors.firstName && <span>{errors.firstName.message}</span>} */}
              <Form.ErrorMessage field="firstName" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="lastName">Sobrenome</Form.Label>
              <Form.Input 
                type="text"
                id="lastName"
                name="lastName"
              />
              <Form.ErrorMessage field="lastName" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="nickName">Login</Form.Label>
              <Form.Input 
                type="text"
                id="nickName"
                name="nickName"
              />
              <Form.ErrorMessage field="nickName" />
              {/* {errors.nickName && <span>{errors.nickName.message}</span>} */}
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="password">Senha</Form.Label>
              <Form.Input
                type="password"
                id="password"
                name="password"
              />
              {  userPassword !== undefined && (isPasswordStrong 
                  ? <span className="text-xs text-emerald-600">Senha forte</span>
                  : <span className="text-xs text-red-500">Senha fraca</span>
                )
              }
              <Form.ErrorMessage field="password" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="confirmPassword">Confirme a Senha</Form.Label>
              <Form.Input 
                name="confirmPassword"
                type="password"
                id="confirmPassword"
              />
              <Form.ErrorMessage field="confirmPassword" />

              {/* {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>} */}
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="credential">Função</Form.Label>
              <Form.Select setIs={setIsShopAssistant} id="credential" name="credential" options={credential} />
              <Form.ErrorMessage field="CredentialName" />

            </Form.Field>
          </Form.Field>
          {isShopAssistant && (
          <Form.Field >
            <Form.Label htmlFor="stores">Qual(is) lojas ele(a) trabalha?</Form.Label>
            <Form.Checkbox 
              values= { stores }
              name="stores" 
            />
            <Form.ErrorMessage field="stores" />
          </Form.Field>)}
          <Button 
            type="submit"
            className="flex items-center bg-yellowDetails text-white text-lg rounded px-3 py-2 font-semibold hover:bg-blueDetails" 
            disabled={isSubmitting && isPasswordStrong}
          >
            Salvar
          </Button>
       </Form.Root>
      </FormProvider>
      <pre className="text-sm">
        {output}
      </pre>
    </main>
  );
}

export default NewUserForm;
