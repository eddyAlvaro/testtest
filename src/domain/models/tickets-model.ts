// Se utiliza para definir la estructura de propiedades esperada de un objeto que contiene la información de tickets
export type TicketsModel = {
  id: number[];
  Entrada: string[];
  Estado: boolean[];
  Descripción: string[];
  Precio: number[];
  Moneda: string[];
  Cantidad: number[];
  "Se canjea por": number[];
  "Total entradas": number[];
};
