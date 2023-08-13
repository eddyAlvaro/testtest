import { RemoteVentas } from "../../../data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteVentas con sus dependencias
export const makeRemoteVentas = () =>
  new RemoteVentas(makeApiUrl(), makeAxiosHttpClient());
