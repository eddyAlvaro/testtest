import { FieldValidation } from "../../validation/protocols";
import {
  CompareFieldsValidation,
  EmailValidation,
  MinLengthValidation,
  RequiredFieldValidation,
} from "../../validation/validators";

//Clase que se usa para construir validaciones de campos en formularios
export class ValidationBuilder {
  //Propiedades de la clase
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) {}

  //Método que inicia la construcción de un conjunto de validaciones para un campo especifico
  static field(fieldName: string): ValidationBuilder {
    //Rerorno una instancia de ValidationBuilder con un nombre de campo y un arreglo vacio
    return new ValidationBuilder(fieldName, []);
  }

  //Método que agrega una validación de campo obligatorio
  required(): ValidationBuilder {
    //Agrega una instancia de RequiredFieldValidation al arreglo validations
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  //Método que agrega una validación de validación de correo
  email(): ValidationBuilder {
    //Agrega una instancia de EmailValidation al arreglo validations
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  //Método que agrega una validación para la longitud minima de los fields
  min(length: number): ValidationBuilder {
    //Agrega una instancia de MinLengthValidation al arreglo validations
    this.validations.push(new MinLengthValidation(this.fieldName, length));
    return this;
  }

  //Método que hace una comparación de los fields
  sameAs(fieldToCompare: string): ValidationBuilder {
    //Agrega una instancia de CompareFieldsValidation al arreglo validations
    this.validations.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare)
    );
    return this;
  }

  //Método que finaliza la construcción y retorna un arreglo de tipo FieldValidation[] con todas las validaciones añadidas
  build(): FieldValidation[] {
    return this.validations;
  }
}
