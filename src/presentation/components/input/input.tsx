import React, { useRef } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  state: any;
  setState: any;
  placeholder: string;
};

//Componente que renderiza un input
const Input: React.FC<Props> = ({
  state,
  setState,
  placeholder,
  ...props
}: Props) => {
  //Referencia para acceder al input en el DOM
  const inputRef: any = useRef<HTMLInputElement>();
  const error = state[`${props.name}Error`];
  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={error ? "invalid" : "valid"}
      className="mb-[20px]"
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder={placeholder}
        data-testid={props.name}
        readOnly
        onFocus={(e) => {
          //Se quita la propiedad readOnly del input
          e.target.readOnly = false;
        }}
        className="px-[15px] py-[10px] w-full border-slate-400 border rounded-[10px] bg-slate-100"
        onChange={(e) => {
          //Se actualiza el state cuando cambia el valor del input
          setState({ ...state, [e.target.name]: e.target.value });
        }}
      />
      {/* <label
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
        title={error}
      >
        {props.name}
      </label> */}
    </div>
  );
};

export default Input;
