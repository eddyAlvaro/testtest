import { EventsClientModel } from "../models";

//Defino mi contrato EventClient el cual tiene un metodo event que devuelve una promesa cuyo resultado esperado es de tipo EventClient.Model
export interface EventClient {
  event: (params: EventClient.Params) => Promise<EventClient.Model>;
}

//Creo un espacio EventClient donde defino 2 tipos
export namespace EventClient {
  //Defino un tipo Params con una propiedad eventid
  export type Params = {
    clieid: number;
  };
  //Defino un tipo Model que hace referencia al tipo EventsClientModel
  export type Model = EventsClientModel;
}
