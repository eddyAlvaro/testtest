import { Validation } from "../../presentation/protocols";
import { FieldValidation } from "../../validation/protocols";

//
export class ValidationComposite implements Validation {
  //Este constructor tiene una propiedad validators que  recibe un arreglo de validaciones
  private constructor(private readonly validators: FieldValidation[]) {}

  //Método que se usa para construir una instancia de ValidationComposite
  static build(validators: FieldValidation[]): ValidationComposite {
    //Retorna una nueva instancia de ValidationComposite con las validaciones proporcionadas
    return new ValidationComposite(validators);
  }

  //Método que ejecuta las validaciones para un field específico en función al conjunto de valicaciones que proporciona validatoris
  validate(fieldName: string, input: object): string | any {
    //Se filtra las validaciones que correnponden al field
    const validators = this.validators.filter((v) => v.field === fieldName);
    //Iteramos sobre las validaciones para ejecutar el metodo validate de cada validación
    for (const validator of validators) {
      const error = validator.validate(input);
      //Si se devuelve un mensaje error, entonces se retorna el mensaje
      if (error) {
        return error.message;
      }
      //Si no hay errores no se retorna nada
    }
  }
}
