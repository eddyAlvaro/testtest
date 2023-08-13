import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";

type Props = {
  data: any;
};
//Componente para el grafico de lineas que renderiza un componente Line de la biblioteca ChartJS
const ChartLine: React.FC<Props> = ({ data }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Propiedades de necesarios para el funcionamiento de la biblioteca de gráficos
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  //Función para pasarle el ancho del screen al setWindowWidth
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    // Suscribirse al evento resize al montar el componente
    window.addEventListener("resize", handleResize);

    return () => {
      // Desuscribirse del evento resize al desmontar el componente
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Condición para el tamaño de fuente del gráfico
  if (windowWidth >= 500) {
    ChartJS.defaults.font.size = 12.5;
  } else {
    ChartJS.defaults.font.size = 10;
  }

  return <Line className="min-h-[250px] " data={data} />;
};

export default ChartLine;
