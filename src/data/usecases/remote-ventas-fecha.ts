import { UnexpectedError } from "../../domain/errors";
import { VentasFechas } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz VentasFechas se encarga de hacer la estructura para la petición al endpoint de venta por rango de fecha a travez del metodo post
 */
export class RemoteVentasFecha implements VentasFechas {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteVentasFecha.Model>
  ) {}

  //Implemento el metodo ventaD del contrato VentasFechas, el cual retorna el body si la petición sale bien.
  async ventaD(params: VentasFechas.Params): Promise<VentasFechas.Model> {
    const data = {
      tagid: tagId.ventasDate,
      Params: {
        eventid: params.eventid,
        startdate: params.startdate,
        enddate: params.enddate,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteVentasFecha.Model
    const httpResponse: HttpResponse<RemoteVentasFecha.Model> =
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
        return httpResponse.body as RemoteVentasFecha.Model;
      default:
        throw new UnexpectedError();
    }
  }
}

//Espacio RemoteAuthentication donde se define un Model que refiere al mismo tipo de VentasFechas.Model
export namespace RemoteVentasFecha {
  export type Model = VentasFechas.Model;
}
