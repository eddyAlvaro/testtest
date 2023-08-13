import React from "react";

type Props = {
  state: any;
};

//Componente para mostrar el estado del login de acuerdo a las validaciones
const FormStatus: React.FC<Props> = ({ state }: Props) => {
  const { mainError } = state;
  return (
    <div data-testid="error-wrap" className="w-full text-center text-red-600">
      {mainError && <span data-testid="main-error">{mainError}</span>}
    </div>
  );
};

export default FormStatus;
