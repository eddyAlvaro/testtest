import { RemoteAssistants } from "../../../data/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteAssistants con sus dependencias
export const makeRemoteAssistants = () =>
  //Se devuelve la instancia pasandole la url del API y la instancia del AxiosHttpClient
  new RemoteAssistants(makeApiUrl(), makeAxiosHttpClient());
