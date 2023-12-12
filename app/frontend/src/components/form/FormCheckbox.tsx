import { useFormContext } from "react-hook-form";
import { Form } from './index';
import { InputHTMLAttributes } from 'react';

interface Store {
 id: number;
 name: string;
}

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
 values: Store[];
 name: string;
}

export function FormCheckbox(props: CheckboxProps) {
 const { register } = useFormContext();


 return (
    <ul className="grid grid-cols-4 justify-around">
      {props.values.map((value) => (
        <li
          key={value.id}
          // className="rounded shadow-sm px-3 py-1 focus:ring-2 focus:ring-blueDetails"
        >
          <input
            id={value.id.toString()}
            className="transition duration-150 w-4 h-4 hover:ring-2 focus:accent-blueDetails accent-yellowDetails ring-yellowDetails focus:ring-blueDetails focus:ring-2"
            type="checkbox"
            value={value.id}
            {...register(props.name)}
            />
          <Form.Label
            className="cursor-pointer text-yellowDetails ms-2 sm font-medium "
            htmlFor={value.id.toString()}
            >
            {value.name}
          </Form.Label>
        </li>
      ))}
    </ul>
 );
}