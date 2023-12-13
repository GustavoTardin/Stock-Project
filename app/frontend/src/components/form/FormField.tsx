import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {}

export function FormField(props: FormFieldProps) {
  return (
    <div className={twMerge("flex flex-col gap-2 ")} {...props} />
  )
}