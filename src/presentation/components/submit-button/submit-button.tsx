import React from "react";

type Props = {
  text: string;
  state: any;
};

//Componente que renderiza un boton
const SubmitButton: React.FC<Props> = ({ state, text }: Props) => {
  return (
    <button
      className="bg-sky-950 text-white p-[10px] w-full rounded-[20px] cursor-pointer"
      data-testid="submit"
      //El boton tendra el estado de disabled dependiendo del state que se le pasa por props
      disabled={state.isFormInvalid}
      type="submit"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
