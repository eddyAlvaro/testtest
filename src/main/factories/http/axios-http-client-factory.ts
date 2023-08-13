import { AxiosHttpClient } from "../../../infra/http";

//Función que crear una instancia de la clase AxiosHttpClient
export const makeAxiosHttpClient = (): AxiosHttpClient => new AxiosHttpClient();
