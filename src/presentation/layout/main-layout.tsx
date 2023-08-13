import React from "react";
import { Header } from "../components";

type Props = {
  children: React.ReactNode;
};

//Componente para estructurar el diseño de la app, colocando el contenido principal por debajo del encabezado
const MainLayout = (props: Props) => {
  return (
    <div id="outer-container">
      <Header />
      <main
        className="min-h-[100vh] bg-[#f5f5f5] main-background"
        id="page-wrap"
      >
        {props.children}
      </main>
    </div>
  );
};

export default MainLayout;
