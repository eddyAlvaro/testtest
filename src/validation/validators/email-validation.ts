import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../protocols";

//Clase que valida un email
export class EmailValidation implements FieldValidation {
  //Propiedad que sera validada
  constructor(readonly field: string) {}

  validate(input: object | any): Error | any {
    //Se define una expresión regular para validar el formato del correo
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //Si el campo es vacio o el valor del campo coincide con el patrón emailRegex se devuelve un null, si nada de esto se cumple, se devuelve el error
    return !input[this.field] || emailRegex.test(input[this.field])
      ? null
      : new InvalidFieldError();
  }
}
