// import { inputDetails, labelDetails } from "@/Utils/Style/inputAndButtons";
import { InputHTMLAttributes } from "react";
// import TNewUser from "../Admin/User/creation/TypeNewUser";
import { useFormContext } from "react-hook-form";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string,
}

export function FormInput(props: FormInputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={ props.name}
      className="transition duration-50 rounded bg-slate-950 text-white border border-yellowDetails shadow-sm px-3 py-2 text-darkBlueDetails focus:outline-none focus:border focus:border-blueDetails"
      {...register(props.name)}
      {...props}
      autoComplete="off"
    />
  )
}
