import { Navigate, useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { ButtonReturn, StateIcon, currentAccountState } from "../../components";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { ButtonOption } from "./components";
import ticketIcon from "../../../../public/ic_ticket.svg";
import eventIcon from "../../../../public/ic_event.svg";
import editIcon from "../../../../public/ic_edit.svg";
import addIcon from "../../../../public/ic_add.svg";
import changeIcon from "../../../../public/change.svg";
import assistantIcon from "../../../../public/ic_assistant.svg";
import salesIcon from "../../../../public/ic_sales.svg";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
type Props = {
  events: any;
};
const EventsPage: React.FC<Props> = ({ events }: Props) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const isAuthenticated = getCurrentAccount();
  const navigate = useNavigate();
  const [state, setState]: any = useState({});

  //Creo un objeto con la id del evento como clave, pasandole un valor de false, haciendo esto por cada evento disponible en el endpoint
  const objeto = events.evenid.reduce((acc: any, currentValue: any) => {
    acc[currentValue] = false;
    return acc;
  }, {});

  useEffect(() => {
    //El valor de objeto lo pasamos al state mediante el setState
    setState(objeto);
  }, []);

  //mapeo de la events obtenida del endpoint, estructurando la información relacionada en objetos
  const test = events.startdate.map((nombre: any, index: any) => ({
    startdate: nombre,
    eventid: events.evenid[index],
    name: events.name[index],
    venue: events.venue[index],
    startdate_text: events.startdate_text[index],
    starttime: events.starttime[index],
    description: events.description[index],
    price: events.price[index],
    artists: events.artists[index],
    status: events.status[index],
    soon: events.soon[index],
    blockpurchase: events.blockpurchase[index],
    image: `${import.meta.env.VITE_API_IMAGE}${events.image[index]} `,
    tickets: `/tickets/${events.evenid[index]}/${events.name[index]}`,
    asistentes: `/assistants/${events.evenid[index]}/${events.name[index]}`,
    ventas: `/ventas/${events.evenid[index]}/${events.name[index]}`,
  }));

  //Verificando la autenticación
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  //Función de enrutado
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };

  //Función para cambiar el estado del Drawer
  const toggleDrawer =
    (anchor: any, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      //Verificando que los eventos de KeyboardEvent sean validos
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      //A la key anchor pasada por params le doy el valor open, que será true o false dependiendo al uso de la función
      setState({ ...state, [anchor]: open });
    };
  return (
    <>
      <section className="flex flex-col  items-center container  py-[30px] gap-[40px]">
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
                redirectViewRoute("/dashboard");
              }}
            >
              <span className="hover:underline text-[18px] ">Eventos</span>
            </div>
          </Breadcrumbs>
          <h1 className="text-[30px] md:text-[40px]">Eventos</h1>
          <div className="flex w-full gap-[10px] py-[10px] ">
            <ButtonReturn
              redirect={() => {
                redirectViewRoute("/dashboard");
              }}
            />
          </div>
        </section>
        <section className="w-full max-w-[1025px] flex flex-col md:flex-row gap-[20px] md:flex-wrap md:justify-between">
          {test.map((e: any, index: any) => (
            <div key={index} className="flex max-w-[1025px] w-full md:w-[48%]">
              <Card
                onClick={toggleDrawer(e.eventid, true)}
                className="flex flex-col max-w-[1025px] w-full hover:bg-[#1c273b45] cursor-pointer"
                sx={{
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
                  <div className="flex items-center justify-between gap-[10px] border border-b-[#95959581] px-[20px]">
                    <div className="flex items-center gap-[5px]">
                      <div className="flex justify-center items-center w-[50px] h-[50px] rounded-[50%] bg-sky-200">
                        <img className="w-[60%]" src={eventIcon} alt="Ticket" />
                      </div>
                      <div className="flex flex-col py-[20px] ">
                        <span className="text-[12px] font-bold">EVENTO</span>
                        <span className="text-[16px] md:text-[16px] xl:text-[25px] ">
                          {e.name}
                        </span>
                      </div>
                    </div>
                    <div className="w-[35px] min-w-[35px] md:w-[50px] md:min-w-[50px] ">
                      <img
                        src={changeIcon}
                        alt="Ver evento"
                        className="hover:bg-slate-400 rounded-[50%]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col xl:flex-row w-full justify-between px-[20px] py-[15px] gap-[20px]">
                    <div className="flex justify-center w-full xl:w-[35%] ">
                      <img
                        className="object-cover rounded-[8px]"
                        src={e.image}
                        alt={e.name}
                      />
                    </div>
                    <div className="flex flex-col xl:w-[60%] gap-[15px] py-[10px]">
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold">LUGAR</span>
                        <span className="text-gray-500">{e.venue}</span>
                      </div>
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col w-[33%]">
                          <span className="text-[12px] font-bold">FECHA</span>
                          <span className="text-gray-500">
                            {e.startdate_text}
                          </span>
                        </div>
                        <div className="flex flex-col w-[33%]">
                          <span className="text-[12px] font-bold">HORA</span>
                          <span className="text-gray-500">
                            {e.starttime ? (
                              e.starttime
                            ) : (
                              <p className=" text-gray-500">Sin Registro</p>
                            )}
                          </span>
                        </div>
                        <div className="flex flex-col w-[33%]">
                          <span className="text-[12px] font-bold">PRECIO</span>
                          <span className="text-gray-500">
                            {e.price ? (
                              e.price
                            ) : (
                              <p className=" text-gray-500">Sin Registro</p>
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold">ARTISTA</span>
                        <span className="text-gray-500">
                          {e.artists ? (
                            e.artists
                          ) : (
                            <p className=" text-gray-500">Sin Registro</p>
                          )}
                        </span>
                      </div>
                      <div className="flex w-full justify-between ">
                        <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                          <span className="text-[12px] font-bold">ESTADO</span>
                          <StateIcon estado={e.status} />
                        </div>
                        <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                          <span className="text-[12px] font-bold">
                            ¿PRONTO?
                          </span>
                          <StateIcon estado={e.soon} />
                        </div>
                        <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                          <span className="text-[12px] font-bold">
                            COMPRAS EN BLOQUE
                          </span>
                          <StateIcon estado={e.blockpurchase} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Box>
              </Card>
              <SwipeableDrawer
                anchor={"right"}
                open={state[e.eventid] ? true : false}
                onClose={toggleDrawer(e.eventid, false)}
                onOpen={toggleDrawer(e.eventid, true)}
              >
                <div className="flex flex-col min-w-[320px] md:w-[500px] xl:w-[700px] gap-[15px]">
                  <div className="flex items-center gap-[20px] border border-b-[#95959581] px-[10px]">
                    <div
                      onClick={toggleDrawer(e.eventid, false)}
                      className="flex items-center justify-center w-[30px] h-[30px] hover:border-[3px] hover:border-red-600 rounded-[50%] "
                    >
                      <span className="max-w-[25px] max-h-[50px] text-[25px] text-red-600 font-bold">
                        ‹
                      </span>
                    </div>
                    <div className="flex items-center gap-[10px]">
                      <div className="flex justify-center items-center w-[50px] h-[50px] rounded-[50%] bg-sky-200">
                        <img className="w-[60%]" src={eventIcon} alt="Ticket" />
                      </div>
                      <div className="flex flex-col py-[20px] ">
                        <span className="text-[12px] font-bold">EVENTO</span>
                        <span className="text-[16px] md:text-[16px] xl:text-[25px] ">
                          {e.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center w-full gap-[10px] px-[10px] md:px-[20px]">
                    <span className="text-[14px] font-bold">IMAGEN</span>
                    <div className="w-full min-h-[3px] max-h-[3px] bg-[#95959581]"></div>
                  </div>
                  <div className="flex justify-center w-full">
                    <img
                      className="w-[80%] xl:w-[60%] rounded-[8px]"
                      src={e.image}
                      alt={e.name}
                    />
                  </div>
                  <div className="flex items-center w-full gap-[10px] px-[10px] md:px-[20px]">
                    <span className="text-[14px] font-bold">PROPIEDADES</span>
                    <div className="w-full min-h-[3px] max-h-[3px] bg-[#95959581]"></div>
                  </div>
                  <div className="flex flex-col w-full gap-[20px] px-[10px] md:px-[30px]">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">LUGAR</span>
                      <span className="text-gray-500">{e.venue}</span>
                    </div>
                    <div className="flex w-full justify-between">
                      <div className="flex flex-col w-[33%]">
                        <span className="text-[12px] font-bold">FECHA</span>
                        <span className="text-gray-500">
                          {e.startdate_text}
                        </span>
                      </div>
                      <div className="flex flex-col w-[33%]">
                        <span className="text-[12px] font-bold">HORA</span>
                        <span className="text-gray-500">
                          {e.starttime ? (
                            e.starttime
                          ) : (
                            <p className=" text-gray-500">Sin Registro</p>
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col w-[33%]">
                        <span className="text-[12px] font-bold">PRECIO</span>
                        <span className="text-gray-500">
                          {e.price ? (
                            e.price
                          ) : (
                            <p className=" text-gray-500">Sin Registro</p>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">ARTISTA</span>
                      <span className="text-gray-500">
                        {e.artists ? (
                          e.artists
                        ) : (
                          <p className=" text-gray-500">Sin Registro</p>
                        )}
                      </span>
                    </div>
                    <div className="flex w-full justify-between  ">
                      <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                        <span className="text-[12px] font-bold">ESTADO</span>
                        <StateIcon estado={e.status} />
                      </div>
                      <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                        <span className="text-[12px] font-bold">¿PRONTO?</span>
                        <StateIcon estado={e.soon} />
                      </div>
                      <div className="flex flex-col justify-between w-[33%] gap-[5px]">
                        <span className="text-[12px] font-bold">
                          COMPRAS EN BLOQUE
                        </span>
                        <StateIcon estado={e.blockpurchase} />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold">DESCRIPCIÓN</span>
                      <span className="min-h-[300px] text-gray-500">
                        {e.description ? e.description : "Sin Registro"}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-[20px] p-[10px] md:p-[30px] sticky bottom-0 bg-[#1c273b]">
                    <div className="flex flex-col gap-[20px]">
                      <div className="flex items-center w-full gap-[10px]">
                        <span className="text-[14px] font-bold whitespace-nowrap text-white">
                          OPCIONES DE EVENTO
                        </span>
                        <div className="w-full min-h-[3px] max-h-[3px] bg-[#95959581]"></div>
                      </div>
                      <div className="flex flex-col xl:flex-row gap-[10px]">
                        <div className="flex flex-col md:flex-row w-full gap-[10px]">
                          {" "}
                          <ButtonOption
                            icon={addIcon}
                            description="Registrar Entrada"
                            route={() => {}}
                          />
                          <ButtonOption
                            icon={editIcon}
                            description="Cambiar Imágenes"
                            route={() => {}}
                          />
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-[10px]">
                          {" "}
                          <ButtonOption
                            icon={addIcon}
                            description="Crear Promociones"
                            route={() => {}}
                          />
                          <ButtonOption
                            icon={addIcon}
                            description="Crear Descuentos"
                            route={() => {}}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <div className="flex items-center w-full gap-[10px]">
                        <span className="text-[14px] font-bold whitespace-nowrap text-white">
                          REPORTE
                        </span>
                        <div className="w-full min-h-[3px] max-h-[3px] bg-[#95959581]"></div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-[10px]">
                        <ButtonOption
                          icon={salesIcon}
                          description="Reporte de ventas"
                          route={() => {
                            redirectViewRoute(e.ventas);
                          }}
                        />
                        <ButtonOption
                          icon={assistantIcon}
                          description="Ver asistentes"
                          route={() => {
                            redirectViewRoute(e.asistentes);
                          }}
                        />
                        <ButtonOption
                          icon={ticketIcon}
                          description="Ver tickets"
                          route={() => {
                            redirectViewRoute(e.tickets);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwipeableDrawer>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};

export default EventsPage;
