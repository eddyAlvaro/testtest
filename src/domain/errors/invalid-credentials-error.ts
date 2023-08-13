//Clase para representar un tipo de error que indica que las credenciales son invalidas
export class InvalidCredentialError extends Error {
  constructor() {
    super("Credenciales Invalidas");
    this.name = "InvalidCredentialError";
  }
}
