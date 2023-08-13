import { InvalidCredentialError, UnexpectedError } from "../../domain/errors";
import { Authentication } from "../../domain/usecases";
import { tagId } from "../../utils";
import { HttpClient, HttpResponse, HttpStatusCode } from "../protocols/http";

/**
 * @author Eddy Alvaro <e.alvaro.arenas@gmail.com>
 * @description Esta clase que implementa de la interfaz Authentication se encarga de hacer la estructura para la petición al endpoint de login a travez del metodo post
 */
export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthentication.Model>
  ) {}

  //Implemento el metodo auth del contrato Authentication, el cual retorna el body si la petición sale bien.
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    //Estructura del cuerpo para la petición
    const data = {
      tagid: tagId.login,
      Params: {
        username: params.username,
        password: params.password,
      },
    };
    const form = new FormData();
    form.append("info", JSON.stringify(data));

    //Hago la solicitud http de tipo POST y espero la respuesta en un objeto HttpResponse de tipo RemoteAuthentication.Model
    const httpResponse: HttpResponse<RemoteAuthentication.Model> =
      await this.httpClient.request({
        url: this.url,
        method: "post",
        body: form,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

    //Decodificación del token JWT, para validar su la información
    const jwttoken = httpResponse.body?.login as string;
    const [_encodedHeader, encodedPayload, _encodedSignature] =
      jwttoken.split(".");
    const decodedPayload = atob(encodedPayload);
    let tokenSub = JSON.parse(decodedPayload);
    const parseSub = JSON.parse(tokenSub.sub);

    //Almaceno en tokenPersid el persid que hay dentro del JWT decodificado
    const tokenPersid = parseSub.persid;

    //Si el token no es nulo y el httpResponse.body existe entonces continuo con el flujo de auth
    if (tokenPersid !== "null" && httpResponse.body) {
      //De acuerdo al statusCode que resulte httpResponse, se retornara un httpResponse.body o por default nos mostrará un error
      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok:
          return httpResponse.body;
        default:
          throw new UnexpectedError();
      }
    }
    //Si no se cumple la anterior condición, definimos seteamos el statusCode en 401 y lanzamos una excepción de tipo InvalidCredentialError
    else {
      httpResponse.statusCode = 401;
      throw new InvalidCredentialError();
    }
  }
}
//Espacio RemoteAuthentication donde se define un Model que refiere al mismo tipo de Authentication.Model
export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}
