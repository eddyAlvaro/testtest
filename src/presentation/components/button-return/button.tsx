type Props = {
  redirect: () => void;
};
//Componente para un boton
const ButtonReturn: React.FC<Props> = ({ redirect }: Props) => {
  return (
    <>
      <span
        onClick={redirect}
        className="text-red-400 text-[16px] cursor-pointer rounded-[6px]  bg-white hover:font-bold border border-red-400 p-[10px] hover:bg-red-600 hover:text-white"
      >
        {`‹ Regresar`}
      </span>
    </>
  );
};

export default ButtonReturn;
