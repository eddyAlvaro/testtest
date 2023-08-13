import { Navigate, useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import {
  ButtonReturn,
  ChartBar,
  ChartDognuth,
  ChartLine,
} from "../../components";
import usersIcon from "../../../../public/ic_users.svg";
import walletIcon from "../../../../public/ic_wallet.svg";
import salesIcon from "../../../../public/ic_sales_type2.svg";
import filterIcon from "../../../../public/ic_filter.svg";
import { formatoDateActual, formatoDateInit } from "../../../utils";
import React, { useEffect, useState } from "react";

type Props = {
  info: any;
  ventaTotal: any;
  ventaFecha: any;
  event: any;
  id: any;
  initDate: any;
  endDate: any;
};
const VentasPage: React.FC<Props> = ({
  info,
  ventaFecha,
  event,
  id,
  initDate,
  endDate,
  ventaTotal,
}: Props) => {
  const [graphic, setGraphic] = useState("1");
  const [findVentas, setFindVentas] = useState(0);
  const [findAforo, setFindAforo] = useState(0);
  const [totalVentas, setTotalVentas] = useState(0);
  const [totalAforo, setTotalAforo] = useState(0);
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [filterDateList, setFilterDateList]: any = useState([]);
  const [test, setTtest]: any = useState([]);
  const [labels, setLabels] = useState();
  const [labelsDate, setLabelsDate]: any = useState([]);
  const [cantidadDate, setcantidadDate]: any = useState(0);
  const [totalDate, settotalDate]: any = useState(0);
  const navigate = useNavigate();

  //Validación de los params info.Entrada, initDate, endDate
  if (info.Entrada == "null" && initDate == undefined && endDate == undefined) {
    return (
      <>
        <Navigate to="/events" />;
      </>
    );
  }
  //Función para enrutar dinámicamente
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };

  //Mapeo de ventaTotal obtenido del endpoint, estructurando la información relacionada en objetos
  const objetiveData = ventaTotal.Capacidad.map((name: any, index: any) => ({
    capacidad: name,
    compradas: ventaTotal["Monto pagado"][index],
  }));

  //Calculando el totalVentas y el totalAforo
  if (totalVentas == 0 && totalAforo == 0) {
    let temp = 0;
    objetiveData.map((e: any) => {
      setTotalAforo((temp += e.capacidad));
    });
    temp = 0;
    objetiveData.map((e: any) => {
      setTotalVentas((temp += e.compradas));
    });
  }

  //Verificación de que la data info.Entrada sea valida
  if (info.Entrada != "null" && typeof info.Entrada !== typeof "") {
    const dataVentas = info.Entrada.map((nombre: any, index: any) => ({
      entrada: nombre,
      capacidad: info.Capacidad[index],
      compradas: info.Compradas[index],
      avance: info["Avance(%)"][index],
      montoEsperado: info["Monto esperado"][index],
      montoPagado: info["Monto pagado"][index],
      avanceMonto: info["avance de monto(%)"][index],
    }));

    //Actualiza el estado con dataVentas
    useEffect(() => {
      setTtest(dataVentas);
    }, []);

    if (findVentas == 0 && findAforo == 0) {
      let temp = 0;
      dataVentas.map((e: any) => {
        //Actualiza el estado con el total de e.montoPagado
        setFindVentas((temp += e.montoPagado));
      });
      temp = 0;
      dataVentas.map((e: any) => {
        //Actualiza el estado con el total de e.capacidad
        setFindAforo((temp += e.capacidad));
      });
    }

    const dataLabels = dataVentas.map((e: any) => e.entrada);

    //Actualiza el estado con los dataLabels
    useEffect(() => {
      setLabels(dataLabels);
    }, []);
  }

  //Verificación de que la data ventaFecha.Dia sea valida

  if (ventaFecha.Dia != "null" && typeof ventaFecha.Dia !== typeof "") {
    const list = ventaFecha.Dia.map((nombre: any, key: any) => ({
      Dia: nombre,
      Cantidad: ventaFecha.Cantidad[key],
      Total: ventaFecha.Total[key],
    }));
    useEffect(() => {
      //Actualiza el estado con list
      setFilterDateList(list);
    }, []);
  } else if (ventaFecha.Dia != "null" && typeof ventaFecha.Dia == typeof "") {
    useEffect(() => {
      //Actualiza el estado con [ventaFecha]
      setFilterDateList([ventaFecha]);
    }, []);
  }

  //Validación del initDate y del endDate
  if (initDate != undefined && endDate != undefined) {
    useEffect(() => {
      //Cambiamos el estado por initDate/enddate
      setLabelsDate([`${initDate}/${endDate}`]);
    }, []);
  }

  //Validando que la lista tenga valores
  if (filterDateList.length > 0) {
    //Calculando el cantidadDate y el totalDate
    if (cantidadDate == 0 && totalDate == 0) {
      let temp = 0;
      filterDateList.map((e: any) => {
        setcantidadDate((temp += e.Cantidad));
        console.log(e.Cantidad);
      });
      temp = 0;
      filterDateList.map((e: any) => {
        settotalDate((temp += e.Total));
        console.log(e.Total);
      });
    }
  }

  //Información necesaria para construir los gráficos de barras y lineas
  const chartDataV2 = (data1: any, data2: any, labels: any) => {
    const dataBarLine = {
      labels,
      datasets: [
        {
          label: "Avance de compras %",
          //test.map((e: any) => e.avance)
          data: data1,
          borderColor: "red",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Avance de monto %",
          //test.map((e: any) => e.avanceMonto)
          data: data2,
          borderColor: "blue",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
    return dataBarLine;
  };

  //Función para estructurar la data de los gráficos
  const chartData = (data: any, labels: any) => {
    const dataDognuth = {
      labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(126, 132, 155, 0.7)",
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
            "rgba(126, 132, 155, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(238, 191, 200, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(176, 232, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return dataDognuth;
  };

  //Función para poder cambiar la visualización del tipo de gráfico
  const handleChange = (event: SelectChangeEvent) => {
    setGraphic(event.target.value as string);
  };

  //Función para hacer la fintración
  const filterRedirectRoute = () => {
    const fechaInicio = new Date(fechaInicial);
    const fechaFin = new Date(fechaFinal);
    const añoInit = fechaInicio.getFullYear();
    const mesInit = String(fechaInicio.getMonth() + 1).padStart(2, "0");
    const diaInit = String(fechaInicio.getDate()).padStart(2, "0");
    const añoEnd = fechaFin.getFullYear();
    const mesEnd = String(fechaFin.getMonth() + 1).padStart(2, "0");
    const diaEnd = String(fechaFin.getDate()).padStart(2, "0");

    const formatoDateInit = `${diaInit}-${mesInit}-${añoInit}`;
    const formatoDateActual = `${diaEnd}-${mesEnd}-${añoEnd}`;
    console.log(formatoDateInit);
    console.log(formatoDateActual);
    //Validando que los inputs sean validos
    if (
      formatoDateActual != "NaN-NaN-NaN" &&
      formatoDateInit != "NaN-NaN-NaN"
    ) {
      navigate(
        `/ventas/${id}/${event}/${formatoDateInit}/${formatoDateActual}`
      );
      window.location.reload();
    } else {
    }
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
                redirectViewRoute(`/ventas/${id}/${event}`);
              }}
            >
              <span className="hover:underline text-[18px] ">Ventas</span>
            </div>
            <div className="flex flex-col w-full gap-[10px] py-[10px]">
              <span className="text-[18px] ">{event}</span>
            </div>
          </Breadcrumbs>
          <h1 className="text-[30px] md:text-[40px]">Avance de ventas</h1>
          <div className="flex w-full gap-[10px] py-[10px] ">
            <ButtonReturn
              redirect={() => {
                redirectViewRoute("/events");
              }}
            />
          </div>
        </section>
        <section className="flex flex-col justify-center items-center w-full max-w-[1025px] gap-[30px]">
          <span className="text-[20px] md:text-[30px] w-full">Resumen</span>
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-[30px]">
            <div className="flex flex-col gap-[10px] text-center bg-green-500 rounded-[15px] border-[2px] border-white py-[20px] min-w-[200px] w-[80%]">
              <div className="flex items-center justify-center gap-[5px]">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[50%] bg-gray-100">
                  <img className="w-[70%]" src={usersIcon} alt="Ticket" />
                </div>
                <h2 className="font-bold text-[20px] text-white">AFORO</h2>
              </div>
              <span className=" text-[26px] text-white">
                {cantidadDate} / {totalAforo}
              </span>
            </div>
            <div className="flex flex-col gap-[10px] text-center bg-slate-500 rounded-[15px] border-[2px] border-white py-[20px] min-w-[200px] w-[80%]">
              <div className="flex items-center justify-center gap-[5px]">
                <div className="flex justify-center items-center w-[40px] h-[40px] rounded-[50%] bg-gray-100">
                  <img className="w-[70%]" src={walletIcon} alt="Ticket" />
                </div>
                <h2 className="font-bold text-[20px] text-white">
                  TOTAL MONTO
                </h2>
              </div>
              <span className=" text-[26px] text-white">
                {totalDate} / {totalVentas}
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full max-w-[1025px] gap-[20px] border-t-[3px] pt-[10px]">
          <div className="flex justify-between items-center w-full">
            <span className="text-[20px] md:text-[30px]">
              Análisis Histórico
            </span>
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
                  Barras comparativo de compras y monto %
                </option>
                <option value={"2"}>
                  Linear comparativo de compras y monto %
                </option>
                <option value={"3"}>Dona de avance comprados %</option>
                <option value={"4"}>Dona de avance monto %</option>
                <option value={"5"}>Dona de cantidad vendida </option>
                <option value={"6"}>Dona de cantidad recaudada </option>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col w-full gap-[10px]">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                sx={{
                  width: `100%`,
                }}
                components={["DatePicker"]}
              >
                <div className="flex flex-col items-center md:flex-row w-full xl:w-[70%] gap-[10px] md:items-stretch">
                  <DatePicker
                    className="w-[80%] md:w-[25%]"
                    label="Fecha de Inicio"
                    onChange={(e: any) => {
                      setFechaInicial(e.$d);
                    }}
                  />
                  <DatePicker
                    className="w-[80%] md:w-[25%]"
                    label="Fecha de Fin"
                    onChange={(e: any) => setFechaFinal(e.$d)}
                  />
                  <Button
                    className="w-[80%] md:w-[30%]"
                    variant="outlined"
                    startIcon={
                      <>
                        <img
                          className="w-[25px] h-[25px]"
                          src={filterIcon}
                          alt="filter"
                        />
                      </>
                    }
                    onClick={filterRedirectRoute}
                  >
                    FIltrar
                  </Button>
                </div>
              </DemoContainer>
            </LocalizationProvider>
            <Button
              className="w-[80%] md:w-[30%]"
              variant="outlined"
              onClick={() => {
                redirectViewRoute(
                  `/ventas/${id}/${event}/${formatoDateInit}/${formatoDateActual}`
                );
                window.location.reload();
              }}
            >
              FIltrar últimos 7 días
            </Button>
          </div>

          <div className="flex  justify-center w-full md:w-[80%]">
            {labels != undefined && test != undefined ? (
              <>
                {graphic == "1" && (
                  <ChartBar
                    data={chartDataV2(
                      test.map((e: any) => e.avance),
                      test.map((e: any) => e.avanceMonto),
                      labels
                    )}
                  />
                )}
                {graphic == "2" && (
                  <ChartLine
                    data={chartDataV2(
                      test.map((e: any) => e.avance),
                      test.map((e: any) => e.avanceMonto),
                      labels
                    )}
                  />
                )}
                {graphic == "3" && (
                  <>
                    <div className="w-[100%] md:w-[60%]">
                      <ChartDognuth
                        data={chartData(
                          test.map((e: any) => e.avance),
                          labels
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
                          test.map((e: any) => e.avanceMonto),
                          labels
                        )}
                      />
                    </div>
                  </>
                )}
                {labelsDate.length > 0 && cantidadDate > 0 && (
                  <>
                    {graphic == "5" && (
                      <>
                        <div className="w-[100%] md:w-[60%]">
                          <ChartDognuth
                            data={chartData(
                              [cantidadDate, totalAforo - cantidadDate],
                              ["Total Vendido", "Total Faltante"]
                            )}
                          />
                        </div>
                      </>
                    )}
                    {graphic == "6" && (
                      <>
                        <div className="w-[100%] md:w-[60%]">
                          <ChartDognuth
                            data={chartData(
                              [totalDate, totalVentas - totalDate],
                              ["Total Recaudado", "Esperado Faltante"]
                            )}
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                <span className="text-red-800 text-[20px]">
                  Sin información
                </span>
              </>
            )}
          </div>
        </section>
        <div className="w-full max-w-[1025px] pt-[10px] border-t-[3px]">
          <span className="text-[20px] md:text-[30px]">
            Lista de avance de ventas
          </span>
        </div>
        <section className="w-full max-w-[1025px] flex flex-col md:flex-row gap-[20px] md:flex-wrap md:justify-between ">
          {test.length > 0 ? (
            test.map((e: any, index: any) => (
              <Card
                key={index}
                className="w-full md:w-[48%] md:max-w-[48%]"
                sx={{
                  display: "flex",
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "8px",
                  border: "1px solid #c9c9c9",
                  boxShadow: "6px 5px 10px -3px rgba(0,0,0,0.56)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: `100%`,
                  }}
                >
                  <div className="flex items-center gap-[10px] border border-b-[#95959581] px-[20px]">
                    <div className="flex justify-center items-center w-[50px] h-[50px] rounded-[50%] bg-sky-200">
                      <img className="w-[60%]" src={salesIcon} alt="Ticket" />
                    </div>
                    <div className="flex flex-col py-[20px] ">
                      <span className="text-[12px] font-bold">
                        AVANCE DE LA ENTRADA
                      </span>
                      <span className="text-[25px] ">{e.entrada}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px] w-full p-[20px]">
                    <div className="flex w-full justify-between gap-[10px]">
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          CAPACIDAD
                        </span>
                        <span className=" text-gray-500">{e.capacidad}</span>
                      </div>
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          COMPRADAS
                        </span>
                        <span className="text-gray-500 ">{e.compradas}</span>
                      </div>
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          AVANCE POR %
                        </span>
                        <span className=" text-gray-500">{e.avance}</span>
                      </div>
                    </div>
                    <div className="flex w-full justify-between gap-[10px]">
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          MONTO ESPERADO
                        </span>
                        <span className="text-gray-500 ">
                          {e.montoEsperado}
                        </span>
                      </div>
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          MONTO PAGADO
                        </span>
                        <span className="text-gray-500 ">{e.montoPagado}</span>
                      </div>
                      <div className="flex flex-col justify-between w-[33%]">
                        <span className="text-[12px] font-bold ">
                          AVANCE DE MONTO %
                        </span>
                        <span className="text-gray-500 ">{e.avanceMonto}</span>
                      </div>
                    </div>
                  </div>
                </Box>
              </Card>
            ))
          ) : (
            <>
              <span className="text-red-800 w-full text-center text-[20px]">
                Sin información
              </span>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default VentasPage;
