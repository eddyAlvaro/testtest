// Se utiliza para definir la estructura de propiedades esperada de un objeto que contiene la información de eventos
export type EventsClientModel = {
  startdate: string[];
  evenid: number[];
  name: string[];
  venue: string[];
  startdate_text: string[];
  starttime: string[];
  description: string[];
  image: string[];
  lat: number[];
  lon: number[];
  artists: string[];
  status: boolean[];
  price: string[];
  soon: boolean[];
  blockpurchase: boolean[];
  slug_name: string[];
};
