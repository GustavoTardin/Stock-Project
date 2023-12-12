// import React from "react"
import { ChangeEvent } from "react"
import { useFormContext } from "react-hook-form"

interface FormSelectProps {
  options: string[]
  name: string
  id: string
  setIs: React.Dispatch<React.SetStateAction<boolean>>
}
export function FormSelect({ options, id, setIs, name, ...rest }: FormSelectProps) {
  const { register } = useFormContext()
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    if(event.target.value === 'Lojista' ){
      setIs(true)
      return 
    }
    setIs(false)
   }
  return (
    <select 
      {...register(name)} {...rest}
      onChange={handleChange}
      id={id}
      className="transition duration-50 bg-slate-950 text-white cursor-pointer rounded border border-yellowDetails shadow-sm px-3 py-2.5 text-darkBlueDetails focus:outline-none focus:border focus:border-blueDetails"
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  )
}