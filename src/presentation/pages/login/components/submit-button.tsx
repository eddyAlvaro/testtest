import { loginState } from "./atoms";

import { useRecoilValue } from "recoil";
import React from "react";
import { SubmitButtonBase } from "../../../components";

type Props = {
  text: string;
};
//Componente que renderiza un SubmitButtonBase pasandole sus props
const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState);
  return <SubmitButtonBase text={text} state={state} />;
};

export default SubmitButton;
