import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { ZodType, z } from "zod"
import { Form } from '../../../form/index';
import { getUserById, updateUser } from "@/Service/Requests/userRequests"
import axios from "axios"
import { NewUserFormProps } from "../creation/NewUserForm"

export type TUpdateUserFormData = {
  firstName: string,
  lastName: string,
  nickName: string,
}

export const updateUserSchema: ZodType<TUpdateUserFormData> = z.object({
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
})

export type UpdateUserData = z.infer<typeof updateUserSchema>

interface UpdateUserFormProps extends NewUserFormProps {
  id: number
} 

export function UpdateUserForm(props: UpdateUserFormProps) {
  const [output, setOutput] = useState('')
  
    const updateUserForm = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: async () => {
      const fetchUserData = await getUserById({id: props.id})
      return {
        firstName: fetchUserData.firstName,
        lastName: fetchUserData.lastName,
        nickName: fetchUserData.nickName,
      }
    }
  })

  const { 
    formState, 
    reset,
    formState: { isSubmitSuccessful },
  } = updateUserForm

  useEffect(() => {
    if (isSubmitSuccessful) { 
      reset({
        firstName: '',
        lastName: '',
        nickName: '',
      })
    }
  }, [formState, isSubmitSuccessful])

  async function handleUpdateUser(data: UpdateUserData) {
    try {
      const a = await updateUser({id: props.id, ...data})
      setOutput(JSON.stringify(a))

    } catch(err){
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data.message;
        setOutput(JSON.stringify(errorMessage))
      }
    }
  }

  return (
    <main className='bg-slate-900 border-yellowDetails rounded border-2 px-80 py-12 mx-52'>
      <FormProvider {...updateUserForm}>
        <Form.Root create={handleUpdateUser}>
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
            </Form.Field>
          </Form.Field>
          <Button 
            type="submit"
            className="flex items-center bg-yellowDetails text-white text-lg rounded px-3 py-2 font-semibold hover:bg-blueDetails" 
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