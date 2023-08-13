import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
import logo from "../../../../public/logo_claro.svg";
import downIcon from "../../../../public/ic_down.svg";
import profileIcon from "../../../../public/ic_profilev2.svg";

//Componente header que renderiza la estructura del navbar
const Header: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  const tokenStorage = localStorage.getItem("account");
  const tokenObj = JSON.parse(tokenStorage as string);
  //Instancia de useNavigate para poder enrutas
  const navigate = useNavigate();

  //Condición para validar el token de login
  if (!tokenObj) {
    return (
      <>
        <Navigate to="/login" />;
      </>
    );
  }

  //Función para alternar el estado de toggle entre true y false
  const handleHideData = () => {
    setToggle(!toggle);
  };

  //Función para cerrar sesión
  const closeSesion = () => {
    //Remover el token del localStorage
    localStorage.removeItem("account");
    //Redirigir a la ruta login
    navigate("/login");
  };

  //Función de enrutado
  const redirectViewRoute = (value: string) => {
    navigate(value);
  };
  return (
    <>
      <header className="flex items-center justify-center p-0 bg-slate-800 h-[100px]   px-[20px] ">
        <div className="flex w-full max-w-[1225px] justify-between items-center">
          <div
            onClick={() => {
              redirectViewRoute("/dashboard");
            }}
            className="w-[200px] md:w-[300px] cursor-pointer"
          >
            <img src={logo} alt="" />
          </div>
          <div
            onClick={handleHideData}
            className="cursor-pointer relative rounded-[50%] bg-white w-[50px] h-[50px]"
          >
            <span className="absolute left-[-10px] bottom-[-10px]">
              <img className="w-[15px]" src={downIcon} alt="icon down" />
            </span>

            <img src={profileIcon} alt="User" className="w-full h-full" />
            {toggle && (
              <div className="flex flex-col justify-center gap-[10px] bg-[#1c273b] rounded-[10px] w-[200px] absolute right-0 bottom-[-50px] h-auto border-slate-500">
                <button
                  onClick={closeSesion}
                  className="w-full block bg-red-600 px-4 py-2 text-sm  rounded-[10px]  hover:bg-red-700 text-white "
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
