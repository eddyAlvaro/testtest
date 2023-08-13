import { UnexpectedError } from "../../domain/errors";
import { Ventas } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz Ventas se encarga de hacer la estructura para la petición al endpoint de vebtas a travez del metodo post
 */
export class RemoteVentas implements Ventas {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteVentas.Model>
  ) {}

  //Implemento el metodo auth del contrato Authentication, el cual retorna el body si la petición sale bien.
  async ventas(params: Ventas.Params): Promise<Ventas.Model> {
    //Estructura del cuerpo para la petición
    const data = {
      tagid: tagId.ventas,
      Params: {
        eventid: params.eventid,
        startdate: params.startdate,
        enddate: params.enddate,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteVentas.Model
    const httpResponse: HttpResponse<RemoteVentas.Model> =
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
        return httpResponse.body as RemoteVentas.Model;
      default:
        throw new UnexpectedError();
    }
  }
}

//Espacio RemoteVentas donde se define un Model que refiere al mismo tipo de Ventas.Model
export namespace RemoteVentas {
  export type Model = Ventas.Model;
}
