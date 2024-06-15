import React, { forwardRef, ReactNode, Ref } from 'react';
import clsx from '../../../utils/clsx';

// type,
//     name,
//     required = false,
//     text,
//     color,
//     down = false,
//     noMargin,
//     ...props

// function Input({
//   value = '',
//   type = 'text',
//   handleChange,
//   label,
//   id,
//   helptext,
//   validationMessage,
//   validationType,
//   ...otherProps
// }: InputProps & React.InputHTMLAttributes) {}

interface Props {
  children?: ReactNode;
  type: string;
  name: string;
  required?: boolean;
  text: string;
  color?: string;
  down?: boolean;
  value?: any;
  noMargin?: boolean;
  otherProps?: any;
}

const Input = forwardRef(function (
  {
    type,
    name,
    required = false,
    text,
    color,
    down = false,
    noMargin,
    autoComplete,
    className,
    ...otherProps
  }: Props & React.InputHTMLAttributes<any>,
  ref: Ref<HTMLInputElement>
) {
  // .inputBlue {
  //   background-color: var(--tint-blue-80);
  // }

  // .inputOrange {
  //   background-color: var(--tint-orange-vivid-80);
  // }

  // .inputGreen {
  //   background-color: var(--orange-vivid-100);
  //   border: 1px solid var(--orange-vivid-900);
  // }

  // .inputError {
  //   background-color: var(--red-050);
  //   border: 1px solid var(--red-600);
  // }

  // .noMargin {
  //   margin: 0 !important ;
  // }

  return (
    <>
      {!down && <label htmlFor={name}>{text}</label>}
      <input
        autoComplete={autoComplete}
        ref={ref}
        className={clsx(
          // classes[`input${color}`],
          'bg-orange-vivid-100 text-base',
          'block w-full p-2 border-none rounded-md',
          noMargin ? 'm-0' : 'mt-1 mb-4',
          className
        )}
        id={name}
        type={type}
        name={name}
        required={required}
        {...otherProps}
      />
      {down && <label htmlFor={name}>{text}</label>}
    </>
  );
});

Input.displayName = 'Input';

export default Input;
