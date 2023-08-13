import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../protocols";

//Clase que verifica la longitud del campo
export class MinLengthValidation implements FieldValidation {
  //Propiedad field que se usara para el nombre del campo y minLength para el tamaño minimo del campo
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: object | any): Error | any {
    //Si la longitud del campo es menor a la propiedad minLength, entonces devuelvo un error, de lo contrario devuelvo null
    return input[this.field]?.length < this.minLength
      ? new InvalidFieldError()
      : null;
  }
}
