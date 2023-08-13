import { RequiredFieldError } from "../errors";
import { FieldValidation } from "../protocols";

//Clase que hace una validación de campo
export class RequiredFieldValidation implements FieldValidation {
  //Propiedad que se validara
  constructor(readonly field: string) {}
  validate(input: object | any): Error | any {
    //Si el campo tiene un valor no vacio, entonces devuelve null, por el contrario devuelvo el error
    return input[this.field] ? null : new RequiredFieldError();
  }
}
