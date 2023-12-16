// import React from "react"
import { ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"


interface IOption {
  id: number
  credential: string
}
interface FormSelectProps {
  options: IOption[]
  name: string
  id: string
  setIs: React.Dispatch<React.SetStateAction<boolean>>
}
export function FormSelect({ options, id, setIs, name, ...rest }: FormSelectProps) {
  const { register } = useFormContext()
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if(event.target.value === '3' ){
      setIs(true)
      return
    }
    setIs(false)
   }
  return (
    <select 
      {...register(id)} {...rest}
      onChange={handleChange}
      id={id}
      className="transition duration-50 bg-slate-950 text-white cursor-pointer rounded border border-yellowDetails shadow-sm px-3 py-2.5 text-darkBlueDetails focus:outline-none focus:border focus:border-blueDetails"
    >
      {options.map((value) => (
        <option key={value.id} value={value.id.toString()}>
          {value.credential}
        </option>
      ))}
    </select>
  )
}