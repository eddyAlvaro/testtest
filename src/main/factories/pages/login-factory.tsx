import React from "react";
import { Login } from "../../../presentation/pages";
import { makeRemoteAuthentication } from "../usecases";
import { makeLoginValidation } from "../validation";

//Componente que renderiza el componente Login proporcionando la información de validación y autenticación
export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
