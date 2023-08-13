import { AccountModel } from "../models";

//Defino mi contrato Authentication el cual tiene un metodo auth que devuelve una promesa cuyo resultado esperado es de tipo Authentication.Model
export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>;
}

//Creo un espacio Authentication donde defino 2 tipos
export namespace Authentication {
  //Defino un tipo Params con 2 propiedades para el logueo
  export type Params = {
    username: string;
    password: string;
  };
  //Defino un tipo Model que hace referencia al tipo AccountModel
  export type Model = AccountModel;
}
