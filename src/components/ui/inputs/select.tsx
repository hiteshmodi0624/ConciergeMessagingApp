"use client";

import { PropsWithChildren } from "react";

interface SelectProps {
  placeholder: string;
  className?: string;
  value: number | string | undefined;
  onChangeHandler?: React.ChangeEventHandler;
  id?: string;
  label?:string
  error?:string
}

const Select = ({
  placeholder,
  className,
  onChangeHandler,
  value,
  children,
  id,
  label,
  error
}: PropsWithChildren<SelectProps>) => {
  return (
    <div
      className={`group relative my-3 mb-3 w-full border-[1px] border-grey focus-within:border-primary `}
    >
      {label && (
        <label
          htmlFor={id ?? placeholder.toLowerCase()}
          className={`pl-3 text-xs
         font-light capitalize text-grey group-focus-within:text-primary`}
        >
          {label}
        </label>
      )}
      <select
        name={placeholder.toLowerCase()}
        id={id ?? placeholder.toLowerCase()}
        value={value}
        onChange={onChangeHandler}
        className={`my-3 h-max w-full bg-transparent p-2 text-white placeholder:font-light placeholder:text-grey 
              focus:outline-none focus:placeholder:text-primary ${className} ${
          label && "!my-0 !py-0 !pb-2 placeholder:opacity-0"
        }`}
      >
        {children}
      </select>
      {error && (
        <p
          className={`absolute -bottom-1 left-3 text-xs font-light text-red-500`}
        >
          {error}
        </p>
      )}
    </div>
  );
};
export default Select;
