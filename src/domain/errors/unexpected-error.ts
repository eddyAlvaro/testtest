//Clase para representar un tipo de error que indica que ocurrió un problema inesperado en la app
export class UnexpectedError extends Error {
  constructor() {
    super("Algo salió mal. Vuelva a intentarlo en breve.");
    this.name = "UnexpectedError";
  }
}
