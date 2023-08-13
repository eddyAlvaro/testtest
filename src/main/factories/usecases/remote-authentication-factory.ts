import { RemoteAuthentication } from "../../../data/usecases";
import { Authentication } from "../../../domain/usecases";
import { makeApiUrl, makeAxiosHttpClient } from "../http";

//Función que crea y devuelve una instancia de RemoteAuthentication con sus dependencias
export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
