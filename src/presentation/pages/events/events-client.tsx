import { Navigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { EventClient } from "../../../domain/usecases";
import { MainLayout } from "../../layout";
import EventsPage from "./events";

type Props = {
  events: EventClient;
};
//Componente que renderiza el mainlayout con la página de eventos
const EventsClient: React.FC<Props> = ({ events }: Props) => {
  const [data, setData]: any = useState([]);

  //Obtenemos el JWT guardado en localStorage
  const tokenStorage = localStorage.getItem("account");
  const tokenObj = JSON.parse(tokenStorage as string);

  //verificación de la existencia del tokenobj obtenido del localStorage
  if (!tokenObj) {
    return (
      <>
        <Navigate to="/login" />;
      </>
    );
  } else {
    //Decodificación del token JWT, para validar su la información
    const jwttoken = tokenObj.login;
    const [_encodedHeader, encodedPayload, _encodedSignature] =
      jwttoken.split(".");
    const decodedPayload = atob(encodedPayload);
    let tokenSub = JSON.parse(decodedPayload);
    const parseSub = JSON.parse(tokenSub.sub);
    //Almaceno en tokenPersid el persid que hay dentro del JWT decodificado
    const tokenPersid = parseSub.persid;

    useEffect(() => {
      (async (): Promise<void> => {
        try {
          //Petición al endpoint pasandole el persid decodificado del JWT en la propiedad clieid
          const ticketsjs = await events.event({ clieid: tokenPersid });
          //Con el metodo setData, pasamos el ticketsjs a data
          setData(ticketsjs);
        } catch (error: any) {}
      })();
    }, []);
  }

  return (
    <>
      <MainLayout>
        {data && data.length != 0 && <EventsPage events={data} />}
      </MainLayout>
    </>
  );
};

export default EventsClient;
