import { VentasFechaModel } from "../models";

//Defino mi contrato VentasFechas el cual tiene un metodo ventaD que devuelve una promesa cuyo resultado esperado es de tipo VentasFechas.Model
export interface VentasFechas {
  ventaD: (params: VentasFechas.Params) => Promise<VentasFechas.Model>;
}

//Creo un espacio VentasFechas donde defino 2 tipos
export namespace VentasFechas {
  //Defino un tipo Params con 3 propiedad eventid, startdate y enddate
  export type Params = {
    eventid: string;
    startdate?: string;
    enddate?: string;
  };

  //Defino un tipo Model que hace referencia al tipo VentasFechaModel
  export type Model = VentasFechaModel;
}
