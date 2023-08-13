import { RemoteEventsClient } from "../../../data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteEventsClient con sus dependencias
export const makeRemoteEventsClient = () =>
  new RemoteEventsClient(makeApiUrl(), makeAxiosHttpClient());
