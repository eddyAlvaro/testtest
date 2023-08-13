import { AccountModel } from "../../domain/models";
import { makeLocalStorageAdapter } from "../factories/cache";

//Función que se utiliza para establecer la información de account en el localStorage
export const setCurrentAccountAdapter = (account: AccountModel): void => {
  //Se usa makeLocalStorageAdapter para obtener su instancia y asi usar el método set que guardar account con su clave "account"
  makeLocalStorageAdapter().set("account", account);
};

//Función que se usa para obtener la información del localStorage
export const getCurrentAccountAdapter = (): AccountModel => {
  //Se usa makeLocalStorageAdapter para obtener su instancia y asi usar el método get para recuperar la data asociada a "account"
  return makeLocalStorageAdapter().get("account");
};
