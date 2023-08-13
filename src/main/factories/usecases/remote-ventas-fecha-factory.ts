import { RemoteVentasFecha } from "../../../data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteVentasFecha con sus dependencias
export const makeRemoteVentasFecha = () =>
  new RemoteVentasFecha(makeApiUrl(), makeAxiosHttpClient());
