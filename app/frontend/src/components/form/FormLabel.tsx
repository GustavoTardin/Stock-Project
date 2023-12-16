import { LabelHTMLAttributes } from "react";

export function FormLabel(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label 
      className=" text-sm text-zinc-300"
      { ...props }
    />
  )

}