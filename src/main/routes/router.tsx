import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  MakeAssistants,
  MakeEvents,
  MakeDashboard,
  MakeLogin,
  MakeTickets,
  MakeVentas,
} from "../factories/pages";
import { RecoilRoot } from "recoil";
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from "../adapters";
import { currentAccountState } from "../../presentation/components";
import React from "react";

//Función para representar el enrutado de la app
const Router: React.FC = () => {
  //Se establece y se obtiene la cuenta actual del localStorage
  const state = {
    setCurrentAccount: setCurrentAccountAdapter,
    getCurrentAccount: getCurrentAccountAdapter,
  };

  return (
    // Se usa recoil para inicial el estado currentAccountState con el valor de state
    <RecoilRoot initializeState={({ set }) => set(currentAccountState, state)}>
      <BrowserRouter>
        {/* Rutas */}
        <Routes>
          <Route path="/login" element={<MakeLogin />} />
          <Route path="/dashboard" element={<MakeDashboard />} />
          <Route path="/tickets/:id/:evt" element={<MakeTickets />} />
          <Route path="/assistants/:id/:evt" element={<MakeAssistants />} />
          <Route path="/ventas/:id/:evt" element={<MakeVentas />} />
          <Route
            path="/ventas/:id/:evt/:initD/:endD"
            element={<MakeVentas />}
          />
          <Route path="/events" element={<MakeEvents />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default Router;
