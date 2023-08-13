import { useEffect, useState } from "react";
import { Tickets } from "../../../domain/usecases";
import { MainLayout } from "../../layout";
import TicketsPage from "./tickets";
import { Navigate, useParams } from "react-router-dom";
import { currentAccountState } from "../../components";
import { useRecoilValue } from "recoil";
import React from "react";
type Props = {
  tickets: Tickets;
};
const TicketsClient: React.FC<Props> = ({ tickets }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const isAuthenticated = getCurrentAccount();

  // Si el usuario no está autenticado, redirige a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const { id } = useParams();
  const { evt } = useParams();

  const [data, setData]: any = useState([]);

  // Obtiene los datos de los tickets cuando el componente se monta
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const ticketsjs = await tickets.tickets({ eventid: `${id}` });
        setData(ticketsjs);
      } catch (error: any) {}
    })();
  }, []);

  return (
    <MainLayout>
      {data && data.length != 0 && (
        <TicketsPage info={data} event={evt} id={id} />
      )}
    </MainLayout>
  );
};

export default TicketsClient;
