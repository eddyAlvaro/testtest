import { AccountModel } from "../../../domain/models";
import { atom } from "recoil";

//Administra el estado actual de mi cuenta
export const currentAccountState = atom({
  //Identificación del atomo
  key: "currentAccountState",
  //Define un valor inicial del átomo
  default: {
    //Funciones para obtener y establecer la cuenta actual
    getCurrentAccount: null as unknown as () => AccountModel,
    setCurrentAccount: null as unknown as (account: AccountModel) => void,
  },
});
