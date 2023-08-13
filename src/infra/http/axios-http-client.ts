import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "../../data/protocols/http";
import axios, { AxiosResponse } from "axios";

//Clase que implementa de HttpClient y que se usa para poder realizar solicitudes de tipo HTTP usando axios
export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    //variable declarada para almacenar la respuesta del axios
    let axiosResponse: AxiosResponse;

    try {
      //Hago la solicitud HTTP usando axios
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      });
    } catch (error: any) {
      //Cualquier error que suceda en la solicitud se captura y se asigna a axiosResponse
      axiosResponse = error;
    }

    //Retorno un objeto de tipo HttpResponse que contiene(statusCode y body) con los valores que obtuvimos del axios
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
