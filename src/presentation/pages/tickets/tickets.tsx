import { Navigate, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import ticketIcon from "../../../../public/ic_ticket.svg";
import React from "react";
import { ButtonReturn, StateIcon } from "../../components";

type Props = {
  info: any;
  event: any;
  id: any;
};
const TicketsPage: React.FC<Props> = ({ info, event, id }: Props) => {
  //Verifica que el info,id no sea 'null'
  if (info.id == "null") {
    return (
      <>
        <Navigate to="/events" />;
      </>
    );
  }
  const navigate = useNavigate();

  //Función para enrutar
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };

  //Mapeo de info obtenida del endpoint, estructurando la información relacionada en objetos
  const test = info.id.map((nombre: any, index: any) => ({
    id: nombre,
    entrada: info.Entrada[index],
    descripcion:
      info.Descripción[index] != ""
        ? info.Descripción[index]
        : "Sin descripción",
    estado: info.Estado[index],
    precio: info.Precio[index],
    moneda: info.Moneda[index],
    cantidad: info.Cantidad[index],
    canjea: info["Se canjea por"][index],
    total: info["Total entradas"][index],
  }));

  return (
    <>
      <section className="flex flex-col  items-center container py-[30px] gap-[40px] mx-[auto]">
        <div className="w-full max-w-[1025px]">
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
                redirectViewRoute(`/tickets/${id}/${event}`);
              }}
            >
              <span className="hover:underline text-[18px] ">Tickets</span>
            </div>
            <div className="flex flex-col w-full gap-[10px] py-[10px]">
              <span className="text-[18px] ">{event}</span>
            </div>
          </Breadcrumbs>
          <h1 className="text-[30px] md:text-[40px]">Tickets</h1>
          <div className="flex w-full gap-[10px] py-[10px] ">
            <ButtonReturn
              redirect={() => {
                redirectViewRoute("/events");
              }}
            />
          </div>
        </div>
        <section className="w-full max-w-[1025px] flex flex-col md:flex-row gap-[20px] md:flex-wrap md:justify-between ">
          {test.map((e: any, index: any) => (
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
                    <img className="w-[60%]" src={ticketIcon} alt="Ticket" />
                  </div>
                  <div className="flex flex-col py-[20px] ">
                    <span className="text-[12px] font-bold">ENTRADA</span>
                    <span className="text-[25px] ">{e.entrada}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-[15px] w-full p-[20px]">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold ">PRECIO</span>
                    <span className="text-[30px] xl:text-[40px] text-gray-500">{`${e.precio} ${e.moneda}`}</span>
                  </div>
                  <div className="flex w-full justify-between gap-[10px]">
                    <div className="flex flex-col justify-between">
                      <span className="text-[12px] font-bold ">CANTIDAD</span>
                      <span className="text-gray-500 ">{e.cantidad}</span>
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="text-[12px] font-bold ">
                        TOTAL ENTRADAS
                      </span>
                      <span className="text-gray-500 ">{e.total}</span>
                    </div>
                    <div className="flex flex-col justify-between">
                      <span className="text-[12px] font-bold ">
                        ES CANJEADO POR
                      </span>
                      <span className=" text-gray-500">{e.canjea}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-[12px] font-bold ">ESTADO</span>
                    <StateIcon estado={e.estado} />
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="text-[12px] font-bold ">DESCRIPCIÓN</span>
                    <span className="text-gray-500">{e.descripcion}</span>
                  </div>
                </div>
              </Box>
            </Card>
          ))}
        </section>
      </section>
    </>
  );
};

export default TicketsPage;
