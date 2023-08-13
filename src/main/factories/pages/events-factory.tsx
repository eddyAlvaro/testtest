import React from "react";
import { makeRemoteEventsClient } from "../usecases";
import { EventsClient } from "../../../presentation/pages";

//Componente que renderiza el componente EventsClient proporcionando la información de los eventos
export const MakeEvents: React.FC = () => {
  return <EventsClient events={makeRemoteEventsClient()} />;
};
