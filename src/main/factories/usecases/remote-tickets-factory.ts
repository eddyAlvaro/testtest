import { RemoteTickets } from "../../../data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteTickets con sus dependencias
export const makeRemoteTickets = () =>
  new RemoteTickets(makeApiUrl(), makeAxiosHttpClient());
