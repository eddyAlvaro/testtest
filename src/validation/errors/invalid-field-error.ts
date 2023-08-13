//Clase que representa un error de campo invalido
export class InvalidFieldError extends Error {
  constructor() {
    super("Invalido");
  }
}
