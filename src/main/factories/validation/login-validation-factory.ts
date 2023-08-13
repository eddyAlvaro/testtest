import { ValidationComposite } from "../../composites";
import { ValidationBuilder as Builder } from "../../builders";

//Función  para crear validaciones del formulario de login
export const makeLoginValidation = (): ValidationComposite =>
  //Instancia con las validaciones para los fields proporcionadas
  ValidationComposite.build([
    //Encadenamos los métodos para construir las validaciones para los fields username y password
    ...Builder.field("username").required().email().build(),
    ...Builder.field("password").required().min(5).build(),
  ]);
