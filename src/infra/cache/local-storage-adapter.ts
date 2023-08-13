import { GetStorage, SetStorage } from "../../data/protocols/http/cache";

//Esta clase que implementa de SetStorage y GetStorage tiene metodos de almacenamiento y recuperación de datos usando localStorage
export class LocalStorageAdapter implements SetStorage, GetStorage {
  //El metodo set define 2 argumentos
  set(key: string, value: object): void {
    //Condición para validar el argumento value
    if (value) {
      //Allmacena el valor serializado JSON en el localStorage junto a su key
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      //Elimina el elemento que corresponde a la key
      localStorage.removeItem(key);
    }
  }
  //Este metodo define un argumento key
  get(key: string): any {
    //Devolvemos el valor parseado que está asociado a la key del localStorage
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
