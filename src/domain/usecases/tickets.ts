import { TicketsModel } from "../models";

//Defino mi contrato Tickets el cual tiene un metodo tickets que devuelve una promesa cuyo resultado esperado es de tipo Tickets.Model
export interface Tickets {
  tickets: (params: Tickets.Params) => Promise<Tickets.Model>;
}

//Creo un espacio Tickets donde defino 2 tipos
export namespace Tickets {
  //Defino un tipo Params con una propiedad eventid
  export type Params = {
    eventid: string;
  };

  //Defino un tipo Model que hace referencia al tipo TicketsModel
  export type Model = TicketsModel;
}
