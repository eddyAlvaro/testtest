import { UnexpectedError } from "../../domain/errors";
import { EventClient } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz EventClient se encarga de hacer la estructura para la petición al endpoint de eventos a travez del metodo post
 */
export class RemoteEventsClient implements EventClient {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteEventsClient.Model>
  ) {}

  //Implemento el metodo event del contrato EventClient, el cual retorna el body si la petición sale bien.
  async event(params: EventClient.Params): Promise<EventClient.Model> {
    //Estructura del cuerpo para la petición
    const data = {
      tagid: tagId.events,
      Params: {
        clieid: params.clieid,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteEventsClient.Model
    const httpResponse: HttpResponse<RemoteEventsClient.Model> =
      await this.httpClient.request({
        url: this.url,
        method: "post",
        body: form,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

    //De acuerdo al statusCode que resulte httpResponse, se retornara un httpResponse.body o por default nos lanzará error
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body as RemoteEventsClient.Model;
      default:
        throw new UnexpectedError();
    }
  }
}

//Espacio RemoteEventsClient donde se define un Model que refiere al mismo tipo de EventClient.Model
export namespace RemoteEventsClient {
  export type Model = EventClient.Model;
}
