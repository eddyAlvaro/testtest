//Interfaz que define la estructura de las validaciones para los campos, cada objeto tiene un field asociado junto a una función para realizar la validación y devolver error si es necesario
export interface FieldValidation {
  field: string;
  validate: (input: object) => Error;
}
