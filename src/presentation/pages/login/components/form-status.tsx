import { useRecoilValue } from "recoil";
import React from "react";
import { loginState } from "./atoms";
import { FormStatusBase } from "../../../components";

//Componente que renderiza un estado de logueo de cuardo al loginState
const FormStatus: React.FC = () => {
  const state = useRecoilValue(loginState);
  return <FormStatusBase state={state} />;
};

export default FormStatus;
