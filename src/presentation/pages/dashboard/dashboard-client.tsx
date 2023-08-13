// import { useEffect, useState } from "react";
// import { EventClient } from "../../../domain/usecases";
import { MainLayout } from "../../layout";
import DashBoard from "./dashboard";
import { Navigate } from "react-router-dom";
import React from "react";
// type Props = {
//   events: EventClient;
// };
const DashBoardClient: React.FC = () => {
  const tokenStorage = localStorage.getItem("account");
  const tokenObj = JSON.parse(tokenStorage as string);
  if (!tokenObj) {
    return (
      <>
        <Navigate to="/login" />;
      </>
    );
  }

  return (
    <MainLayout>
      <DashBoard />
    </MainLayout>
  );
};

export default DashBoardClient;
