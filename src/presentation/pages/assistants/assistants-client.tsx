import { useEffect, useState } from "react";
import { Assistants } from "../../../domain/usecases";
import { MainLayout } from "../../layout";
import AssistantsPage from "./assistants";
import { useParams } from "react-router-dom";
import React from "react";
type Props = {
  assistants: Assistants;
};
//Componente que renderiza el mainlayout con la página de asistentes
const AssistantsClient: React.FC<Props> = ({ assistants }: Props) => {
  const [data, setData]: any = useState([]);
  //Valores obtenidos por params
  const { id } = useParams();
  const { evt } = useParams();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        //Petición al endpoint pasandole el id de params en la propiedad eventid
        const ticketsjs = await assistants.evento({ eventid: `${id}` });

        //Con el metodo setData, pasamos el ticketsjs a data
        setData(ticketsjs);
      } catch (error: any) {}
    })();
  }, []);

  return (
    <MainLayout>
      {data && data.length != 0 && (
        <AssistantsPage info={data} event={evt} id={id} />
      )}
    </MainLayout>
  );
};

export default AssistantsClient;
