import { AssistantsModel } from "../models";

//Defino mi contrato Assistants el cual tiene un metodo evento que devuelve una promesa cuyo resultado esperado es de tipo Assistants.Model
export interface Assistants {
  evento: (params: Assistants.Params) => Promise<Assistants.Model>;
}

//Creo un espacio Assistants donde defino 2 tipos
export namespace Assistants {
  //Defino un tipo Params con una propiedad eventid
  export type Params = {
    eventid: string;
  };
  //Defino un tipo Model que hace referencia al tipo AssistantsModel
  export type Model = AssistantsModel;
}
