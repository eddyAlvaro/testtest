// Se utiliza para definir la estructura de propiedades esperada de un objeto que contiene la información de avance de venta
export type VentasModel = {
  Entrada: string[];
  Capacidad: number[];
  Compradas: number[];
  "Avance(%)": number[];
  "Monto esperado": number[];
  "Monto pagado": number[];
  "avance de monto(%)": number[];
};
