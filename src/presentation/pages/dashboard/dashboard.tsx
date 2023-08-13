import { useRecoilValue } from "recoil";
import { Navigate, useNavigate } from "react-router-dom";
import { currentAccountState } from "../../components";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import eventsTransparentImage from "../../../../public/events.svg";
import changeIcon from "../../../../public/change.svg";
import React from "react";

const DashBoard: React.FC = () => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState);
  const isAuthenticated = getCurrentAccount();
  const navigate = useNavigate();
  const tokenStorage = localStorage.getItem("account");
  const tokenObj = JSON.parse(tokenStorage as string);
  const jwttoken = tokenObj.login;

  const [_encodedHeader, encodedPayload, _encodedSignature] =
    jwttoken.split(".");
  const decodedPayload = atob(encodedPayload);
  let tokenSub = JSON.parse(decodedPayload);
  const parseSub = JSON.parse(tokenSub.sub);
  const userName = parseSub.fullname;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };
  return (
    <>
      <section className="flex flex-col  items-center contain p-[30px] gap-[40px]">
        <div className="w-full max-w-[1025px]">
          <h1 className="text-[30px] md:text-[40px]">Dashboard</h1>
          <p className="text-[20px] md:text-[25px]">
            Bienvenido(a) {userName}!
          </p>
        </div>
        <Card
          onClick={() => {
            redirectViewRoute("/events");
          }}
          className="flex flex-col md:flex-row max-w-[1025px] cursor-pointer hover:bg-slate-400 hover:bg-opacity-30"
          sx={{
            display: "flex",
            background: "rgba(255,255,255,0.5)",
            borderRadius: "8px",
            border: "1px solid #c9c9c9",
            boxShadow: "6px 5px 10px -3px rgba(0,0,0,0.56)",
          }}
        >
          <div className="flex w-full md:w-[100%] xl:w-[60%]">
            <CardMedia
              component="img"
              sx={{ width: `100%` }}
              image={eventsTransparentImage}
              alt="Live from space album cover"
              className=" w-[100px] "
            />
          </div>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div className="flex flex-col h-full justify-center gap-[20px] p-[20px] md:p-[30px] xl:p-[40px]">
              <Typography component="div" variant="h5" className="mx-[30px]">
                Eventos
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Gestiona tus eventos asignados, administra tickets, realiza
                seguimiento de los asistentes y obtén a detalle informacion
                sobre las ventas.
              </Typography>
              <div className="self-end w-[50px] ">
                <img
                  src={changeIcon}
                  alt="Ver evento"
                  className="hover:bg-slate-400 rounded-[50%]"
                />
              </div>
            </div>
          </Box>
        </Card>
      </section>
    </>
  );
};

export default DashBoard;
