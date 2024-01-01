import { TUpdatePassword } from "@/Service/Requests/userRequests";
import { Form } from "@/components/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZodType, z } from "zod";

const UpdatePasswordSchema: ZodType<TUpdatePassword> = z.object({
  currentPassword: z.string().nonempty({
    message: 'A senha é obrigatória'
  }),
  newPassword: z.string().nonempty({
    message: 'A senha é obrigatória'
  }).min(5, {
    message: 'A senha deve ter no mínimo 5 caracteres'
  }).max(20, {
    message: 'A senha deve ter no máximo 20 caracteres'
  }),
}).refine((data) => data.currentPassword !== data.newPassword, {
  message: "A senha nova deve ser diferente da senha antiga",
  path: ["newPassword"],
})

export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>

export function UpdatePassword() {
  const [output, setOutput] = useState('')
  const updatePasswordForm = useForm<UpdatePasswordData>({
    resolver: zodResolver(UpdatePasswordSchema),
  })
  const { 
    // handleSubmit, 
    formState: { isSubmitting }, 
    watch,
    // control,
    // register,
  } = updatePasswordForm
  const passwordWatched = watch('newPassword')
  const isPasswordStrong = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})').test(passwordWatched)

  const handlePassword = (data: UpdatePasswordData) => {
    console.log(data)
    setOutput(JSON.stringify(data))

  }

  return (
    <main className='bg-slate-900 border-yellowDetails rounded border-2 px-80 py-12 mx-52'>
      <FormProvider {...updatePasswordForm}>
        <Form.Root create={handlePassword}>
          <Form.Field>
            <Form.Label htmlFor="currentPassword">Senha Atual</Form.Label>
            <Form.Input
              type="password"
              id="currentPassword"
              name="currentPassword"
            />
            <Form.ErrorMessage field="currentPassword" />
          </Form.Field>
          <Form.Field>
            <Form.Label 
              htmlFor="newPassword"
            >Nova senha
            {  (isPasswordStrong 
                  ? <span className="text-xs text-emerald-600">Senha forte</span>
                  : <span className="text-xs text-red-500">Senha fraca</span>
                )}
            </Form.Label>
            <Form.Input
              type="password"
              id="newPassword"
              name="newPassword"
            />
            <Form.ErrorMessage field="newPassword" />
          </Form.Field>
          <Button 
            type="submit"
            className="flex items-center bg-yellowDetails text-white text-lg rounded px-3 py-2 font-semibold hover:bg-blueDetails"  disabled={isSubmitting}
          >
            Salvar
          </Button>
        </Form.Root>
      </FormProvider>
      <pre className="text-sm">
        {output}
      </pre>
    </main>
  )
}