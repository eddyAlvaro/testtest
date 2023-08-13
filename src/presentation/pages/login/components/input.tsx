import { loginState } from "./atoms";

import { useRecoilState } from "recoil";
import React from "react";
import { InputBase } from "../../../components";

type Props = {
  type: string;
  name: string;
  placeholder: string;
};

//Componente input que renderiza el componente inputBase pasandole sus props
const Input: React.FC<Props> = ({ type, name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(loginState);
  return (
    <InputBase
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  );
};

export default Input;
