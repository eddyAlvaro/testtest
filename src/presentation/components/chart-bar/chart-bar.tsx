import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useEffect, useState } from "react";

type Props = {
  data: any;
};
//Componente para el grafico de barras que renderiza un componente Bar de la biblioteca ChartJS
const ChartBar: React.FC<Props> = ({ data }: Props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Propiedades de necesarios para el funcionamiento de la biblioteca de gráficos
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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

    // Desuscribirse del evento resize al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Condición para el tamaño de fuente del gráfico
  if (windowWidth >= 500) {
    ChartJS.defaults.font.size = 12.5;
  } else {
    ChartJS.defaults.font.size = 10;
  }

  //Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return <Bar className="min-h-[250px] " options={options} data={data} />;
};

export default ChartBar;
