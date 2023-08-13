import { UnexpectedError } from "../../domain/errors";
import { Assistants } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz Assistants se encarga de hacer la estructura para la petición al endpoint de assistants a travez del metodo post
 */
export class RemoteAssistants implements Assistants {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAssistants.Model>
  ) {}

  //Implemento el metodo evento del contrato Assistants, el cual retorna el body si la petición sale bien.
  async evento(params: Assistants.Params): Promise<Assistants.Model> {
    //Estructura del cuerpo para la petición
    const data = {
      tagid: tagId.assistants,
      Params: {
        eventid: params.eventid,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteAssistants.Model
    const httpResponse: HttpResponse<RemoteAssistants.Model> =
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
        return httpResponse.body as RemoteAssistants.Model;
      default:
        throw new UnexpectedError();
    }
  }
}

//Espacio RemoteAssistants donde se define un Model que refiere al mismo tipo de Assistants.Model
export namespace RemoteAssistants {
  export type Model = Assistants.Model;
}
