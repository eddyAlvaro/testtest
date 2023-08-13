import { UnexpectedError } from "../../domain/errors";
import { Tickets } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz Tickets se encarga de hacer la estructura para la petición al endpoint de tickets a travez del metodo post
 */
export class RemoteTickets implements Tickets {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteTickets.Model>
  ) {}

  //Implemento el metodo tickets del contrato Tickets, el cual retorna el body si la petición sale bien.
  async tickets(params: Tickets.Params): Promise<Tickets.Model> {
    //Estructura del cuerpo para la petición
    const data = {
      tagid: tagId.tickets,
      Params: {
        eventid: params.eventid,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteAuthentication.Model
    const httpResponse: HttpResponse<RemoteTickets.Model> =
      await this.httpClient.request({
        url: this.url,
        method: "post",
        body: form,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

    //De acuerdo al statusCode que resulte httpResponse, se retornara un httpResponse.body o por default nos mostrará un error
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteTickets.Model;
      default:
        throw new UnexpectedError();
    }
  }
}

//Espacio RemoteTickets donde se define un Model que refiere al mismo tipo de Tickets.Model
export namespace RemoteTickets {
  export type Model = Tickets.Model;
}
