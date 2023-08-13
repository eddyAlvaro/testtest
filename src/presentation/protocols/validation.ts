//Interfaz con una propiedad validate que tome un nombre de campo y datos a validar, y devuelve un mensaje de error si la validación falla
export interface Validation {
  validate: (fieldName: string, input: object) => string;
}
