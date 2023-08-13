//Creo un tipo con las propiedades (url, method,body,headers) para la estructura de la petición al endpoint
export type HttpRequest = {
  url: string;
  method: HttpMethode;
  body?: FormData;
  headers?: any;
};

//Contrato con metodo request que devuelve una promesa que se resolverá en un HttpResponse con el tipo generico R
export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

//Defino los únicos tipos para el metodo de la petición
export type HttpMethode = "post" | "get" | "put";

//Creo un enumerador para los diferentes estados que puede darme mi petición
export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

//Tipo para modelar una respuesta HTTP cuyas propiedades son un codigo de estado y un posible body de respuesta, con el generico R se puede personalizar en body
export type HttpResponse<R = any> = {
  statusCode: HttpStatusCode;
  body?: R;
};
