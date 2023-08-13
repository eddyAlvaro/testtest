import React from "react";
import { VentasClient } from "../../../presentation/pages";
import { makeRemoteVentas, makeRemoteVentasFecha } from "../usecases";

//Componente que renderiza el componente VentasClient proporcionando la información de avance de ventas y ventas por rango de fecha
export const MakeVentas: React.FC = () => {
  return (
    <VentasClient
      ventas={makeRemoteVentas()}
      ventasFecha={makeRemoteVentasFecha()}
    />
  );
};
