//Clase que representa un error de campo obligatorio
export class RequiredFieldError extends Error {
  constructor() {
    super("Campo Obligatorio");
    this.name = "RequiredFieldError";
  }
}
