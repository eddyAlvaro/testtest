import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React from "react";

type Props = {
  data: any;
};
//Componente para el grafico de dona que renderiza un componente Doughnut de la biblioteca ChartJS
const CharDognuth: React.FC<Props> = ({ data }: Props) => {
  //Propiedades de necesarios para el funcionamiento de la biblioteca de gráficos
  ChartJS.register(ArcElement, Tooltip, Legend);

  return <Doughnut data={data} />;
};

export default CharDognuth;
