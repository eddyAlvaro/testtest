const fechaActual = new Date();
const fechaActualReplace = new Date();
fechaActualReplace.setDate(fechaActualReplace.getDate() - 7);
const añoInit = fechaActualReplace.getFullYear();
const mesInit = String(fechaActualReplace.getMonth() + 1).padStart(2, "0");
const diaInit = String(fechaActualReplace.getDate()).padStart(2, "0");
const añoEnd = fechaActual.getFullYear();
const mesEnd = String(fechaActual.getMonth() + 1).padStart(2, "0");
const diaEnd = String(fechaActual.getDate()).padStart(2, "0");

//Formato de fechas para utilizar en la filtración de los ultimos 7 días
export const formatoDateInit = `${diaInit}-${mesInit}-${añoInit}`;
export const formatoDateActual = `${diaEnd}-${mesEnd}-${añoEnd}`;

//Objeto con todos los tagId existentes para realizar la petición al endpoint
export const tagId = {
  login: 601,
  tickets: 408,
  assistants: 510,
  ventas: 511,
  ventasDate: 512,
  events: 513,
};
