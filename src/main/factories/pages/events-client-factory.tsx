import React from "react";
import { EventsClient } from "../../../presentation/pages";
import { makeRemoteEventsClient } from "../usecases";

//Componente que renderiza el componente EventsClient proporcionando la información de los eventos
export const MakeEventsClient: React.FC = () => {
  return <EventsClient events={makeRemoteEventsClient()} />;
};
