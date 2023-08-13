import { InvalidFieldError } from "../errors";
import { FieldValidation } from "../protocols";

//Clase que compara dos fields
export class CompareFieldsValidation implements FieldValidation {
  //Propiedades que serán comparadas
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}
  validate(input: object | any): Error | any {
    //Devuelve un error si los fields no coinciden, por el contrario devuelve null
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError()
      : null;
  }
}
