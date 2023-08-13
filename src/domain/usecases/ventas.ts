import { VentasModel } from "../models";

//Defino mi contrato Ventas el cual tiene un metodo ventas que devuelve una promesa cuyo resultado esperado es de tipo Ventas.Model
export interface Ventas {
  ventas: (params: Ventas.Params) => Promise<Ventas.Model>;
}

//Creo un espacio Ventas donde defino 2 tipos
export namespace Ventas {
  //Defino un tipo Params con 3 propiedad eventid, startdate y enddate de los cuales estos 2 ultimos no son obligatorios
  export type Params = {
    eventid: string;
    startdate?: string;
    enddate?: string;
  };

  //Defino un tipo Model que hace referencia al tipo VentasModel
  export type Model = VentasModel;
}
