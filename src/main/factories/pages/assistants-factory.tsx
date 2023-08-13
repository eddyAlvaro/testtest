import React from "react";
import { AssistantsClient } from "../../../presentation/pages";
import { makeRemoteAssistants } from "../usecases";

//Componente que renderiza el componente AssistantsClient proporcionando la información de asistentes
export const MakeAssistants: React.FC = () => {
  return <AssistantsClient assistants={makeRemoteAssistants()} />;
};
