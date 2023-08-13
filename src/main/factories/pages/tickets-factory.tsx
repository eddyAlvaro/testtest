import React from "react";
import { TicketsClient } from "../../../presentation/pages";
import { makeRemoteTickets } from "../usecases";

//Componente que renderiza el componente TicketsClient proporcionando la información de los tickets
export const MakeTickets: React.FC = () => {
  return <TicketsClient tickets={makeRemoteTickets()} />;
};
