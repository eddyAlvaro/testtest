import { useEffect, useState } from "react";
import { Ventas, VentasFechas } from "../../../domain/usecases";
import { MainLayout } from "../../layout";
import { Navigate, useParams } from "react-router-dom";
import { currentAccountState } from "../../components";
import { useRecoilValue } from "recoil";
import VentasPage from "./ventas";
import React from "react";
import { formatoDateActual, formatoDateInit } from "../../../utils";
type Props = {
  ventas: Ventas;
  ventasFecha: VentasFechas;
};

//Componente que renderiza la view de ventas
const VentasClient: React.FC<Props> = ({ ventas, ventasFecha }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const isAuthenticated = getCurrentAccount();

  //Valores obtenidos por params
  const { id } = useParams();
  const { evt } = useParams();
  const { initD } = useParams();
  const { endD } = useParams();

  //Verificación de la autentición
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const [venta, setVenta]: any = useState([]);
  const [ventaTotal, setVentaTotal]: any = useState([]);
  const [ventaFecha, setVentaFecha]: any = useState([]);

  // Obtiene los datos de ventas cuando el componente se monta
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        if (initD != undefined && endD != undefined) {
          //Para la fintración le pasamos un startdate y un enddate si es que se pasa por params
          const ticketsjs = await ventas.ventas({
            eventid: `${id}`,
            startdate: initD,
            enddate: endD,
          });
          setVenta(ticketsjs);
        } else {
          const ticketsjs = await ventas.ventas({
            eventid: `${id}`,
          });
          setVenta(ticketsjs);
        }
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);

  // Obtiene los datos de ventasFecha cuando el componente se monta
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const valorFecha = await ventasFecha.ventaD({
          eventid: `${id}`,
          startdate: initD ? initD : formatoDateInit,
          enddate: endD ? endD : formatoDateActual,
        });
        setVentaFecha(valorFecha);
      } catch (error: any) {}
    })();
  }, []);

  // Obtiene los datos de ventas cuando el componente se monta, para tener una cantidad dinámica del total sin que se modifique al hacer la filtración
  useEffect(() => {
    (async (): Promise<void> => {
      try {
        const ticketsjs = await ventas.ventas({
          eventid: `${id}`,
        });
        setVentaTotal(ticketsjs);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <MainLayout>
      {venta &&
        venta.length != 0 &&
        ventaTotal &&
        ventaTotal.length != 0 &&
        ventaFecha &&
        ventaFecha.length != 0 && (
          <>
            <VentasPage
              info={venta}
              ventaFecha={ventaFecha}
              event={evt}
              id={id}
              initDate={initD}
              endDate={endD}
              ventaTotal={ventaTotal}
            />
          </>
        )}
    </MainLayout>
  );
};

export default VentasClient;
