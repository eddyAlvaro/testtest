import { Navigate, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ButtonReturn,
  ChartBar,
  ChartDognuth,
  ChartLine,
  currentAccountState,
} from "../../components";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FormControl from "@mui/material/FormControl";

import React from "react";
import { PaginationCard } from "./components";

type Props = {
  info: any;
  event: any;
  id: any;
};

//Componente que se encarga de renderizar toda la parte visual de la página asistentes
const AssistantsPage: React.FC<Props> = ({ info, event, id }: Props) => {
  const [graphic, setGraphic] = React.useState("1");
  const allEntradas = info["Entrada"];
  const allAssisntants = info["Asistentes"];
  const allComprados = info["Comprados"];
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const isAuthenticated = getCurrentAccount();
  const entradasConAsistentes: any = [];

  //Instancia de useNavigate
  const navigate = useNavigate();

  //Verificación de la cuenta
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  //Validación para evitar mostrar view si es que no hay información valida proveniente del endpoint
  if (info.Cliente == "null") {
    return (
      <>
        <Navigate to="/events" />;
      </>
    );
  }

  //Función con un argumento value que sirve para redireccionar
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };

  //Mapeo de info obtenida del endpoint, estructurando la información relacionada en objetos
  const test = info.Cliente.map((nombre: any, index: any) => ({
    cliente: nombre,
    entrada: info.Entrada[index],
    comprados: info.Comprados[index],
    asistentes: info.Asistentes[index],
  }));

  //Itera las entradas para juntar en un objeto el total de asistentes y comprados por entrada
  for (let i = 0; i < allEntradas.length; i++) {
    const entrada = allEntradas[i];
    const asistentes = allAssisntants[i];
    const comprados = allComprados[i];
    const entradaExistente = entradasConAsistentes.find(
      (item: any) => item.entrada === entrada
    );
    if (entradaExistente) {
      entradaExistente.asistentes += asistentes;
      entradaExistente.comprados += comprados;
    } else {
      entradasConAsistentes.push({ entrada, asistentes, comprados });
    }
  }

  //etiquetas para usar en los gráficos
  const labels = entradasConAsistentes.map((e: any) => e.entrada);

  //Información necesaria para construir los gráficos de barras y lineas
  const dataBarLine = {
    labels,
    datasets: [
      {
        label: "Asistentes",
        data: entradasConAsistentes.map((e: any) => e.asistentes),
        borderColor: "red",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Comprados",
        data: entradasConAsistentes.map((e: any) => e.comprados),
        borderColor: "blue",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  //Función para estructurar la data de los gráficos
  const chartData = (data: any) => {
    const dataDognuth = {
      labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(54, 162, 235, 0.7)",
            "rgba(238, 191, 200, 0.7)",
            "rgba(255, 206, 86, 0.7)",
            "rgba(75, 192, 192, 0.7)",
            "rgba(153, 102, 255, 0.7)",
            "rgba(126, 132, 155, 0.7)",
            "rgba(255, 159, 64, 0.7)",
            "rgba(176, 232, 255, 0.7)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(238, 191, 200, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(126, 132, 155, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(176, 232, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return dataDognuth;
  };

  //Función para poder cambiar los gráficos
  const handleChange = (event: SelectChangeEvent) => {
    setGraphic(event.target.value as string);
  };
  return (
    <>
      <section className="flex flex-col  items-center container py-[30px] gap-[40px] mx-[auto]">
        <section className="w-full max-w-[1025px]">
          <Breadcrumbs aria-label="breadcrumb">
            <div
              className="flex flex-col w-full gap-[10px] py-[10px] cursor-pointer hover:text-slate-500 hover:font-bold "
              onClick={() => {
                redirectViewRoute("/dashboard");
              }}
            >
              <span className="hover:underline text-[18px] ">HOME</span>
            </div>
            <div
              className="flex flex-col w-full gap-[10px] py-[10px] cursor-pointer hover:text-slate-500 hover:font-bold "
              onClick={() => {
                redirectViewRoute("/events");
              }}
            >
              <span className="hover:underline text-[18px] ">Eventos</span>
            </div>
            <div
              className="flex flex-col w-full gap-[10px] py-[10px] cursor-pointer hover:text-slate-500 hover:font-bold "
              onClick={() => {
                redirectViewRoute(`/assistants/${id}/${event}`);
              }}
            >
              <span className="hover:underline text-[18px] ">Asistentes</span>
            </div>
            <div className="flex flex-col w-full gap-[10px] py-[10px]">
              <span className="text-[18px] ">{event}</span>
            </div>
          </Breadcrumbs>
          <h1 className="text-[30px] md:text-[40px]">Asistentes</h1>
          <div className="flex w-full gap-[10px] py-[10px] ">
            <ButtonReturn
              redirect={() => {
                redirectViewRoute("/events");
              }}
            />
          </div>
        </section>
        <section className="flex flex-col items-center w-full max-w-[1025px] gap-[50px] ">
          <div className="flex justify-between items-center w-full">
            <span className="text-[20px] md:text-[30px]">Análisis gráfico</span>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel htmlFor="grouped-native-select">Gráficos</InputLabel>
              <Select
                native
                defaultValue=""
                id="grouped-native-select"
                label="Gráficos"
                onChange={handleChange}
              >
                <option value={"1"}>
                  Barras comparativas de comprados y asistentes
                </option>
                <option value={"2"}>
                  Linear comparativas de comprados y asistentes
                </option>
                <option value={"3"}>Dona de total comprados</option>
                <option value={"4"}>Dona de total asistentes</option>
              </Select>
            </FormControl>
          </div>
          <div className="flex  justify-center w-full md:w-[80%]">
            {graphic == "1" && <ChartBar data={dataBarLine} />}
            {graphic == "2" && <ChartLine data={dataBarLine} />}
            {graphic == "3" && (
              <>
                <div className="w-[100%] md:w-[60%]">
                  <ChartDognuth
                    data={chartData(
                      entradasConAsistentes.map((e: any) => e.comprados)
                    )}
                  />
                </div>
              </>
            )}
            {graphic == "4" && (
              <>
                <div className="w-[100%] md:w-[60%]">
                  <ChartDognuth
                    data={chartData(
                      entradasConAsistentes.map((e: any) => e.asistentes)
                    )}
                  />
                </div>
              </>
            )}
          </div>
        </section>
        <div className="w-full max-w-[1025px] pt-[10px] border-t-[3px]">
          <span className="text-[20px] md:text-[30px]">Lista de Clientes</span>
        </div>
        <section className="w-full max-w-[1025px] flex flex-col md:flex-row gap-[20px] md:flex-wrap md:justify-between ">
          <PaginationCard data={test} dataSize={10} />
        </section>
      </section>
    </>
  );
};

export default AssistantsPage;
