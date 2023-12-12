import { useFormContext } from 'react-hook-form'
import { ReactNode } from 'react'

type FormRootProps = {
  children: ReactNode
  create: any
}
export function FormRoot(props: FormRootProps) {
  const { handleSubmit} = useFormContext()
  const { create } = props

  return ( 
      <form 
        onSubmit={handleSubmit(create)}
        className='flex flex-col justify-center gap-4'
      >
        {props.children }
      </form>
  )
}