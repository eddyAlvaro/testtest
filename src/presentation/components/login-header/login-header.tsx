import React, { memo } from "react";

//Componente que renderiza un titulo para el login
const LoginHeader: React.FC = () => {
  return (
    <span>
      <h1 className="text-[30px] font-[500] text-center">Login</h1>
    </span>
  );
};

export default memo(LoginHeader);
