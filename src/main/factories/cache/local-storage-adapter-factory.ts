import { LocalStorageAdapter } from "../../../infra/cache";

//Función que crea una instancia de la clase LocalStorageAdapter
export const makeLocalStorageAdapter = (): LocalStorageAdapter =>
  new LocalStorageAdapter();
