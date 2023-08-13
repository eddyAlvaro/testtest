type Props = {
  icon: string;
  description: string;
  route: () => void;
};

//Componente que renderiza un boton dinámico
const ButtonOption = ({ icon, description, route }: Props) => {
  return (
    <button
      onClick={route}
      className="w-full flex justify-center items-center md:flex-row md:justify-center bg-transparent rounded-[8px] border-[2px] border-[rgba(25,118,210,0.5)] py-[8px] px-[4px] hover:bg-[rgba(25,118,210,0.08)] hover:border-[rgb(25,118,210)]"
    >
      <img className="w-[25px] md:w-[30px]" src={icon} alt="" />
      <div className="w-[70%]">
        <p className="text-[14px] md:text-[80%] xl:text-[100%] text-[rgb(255,255,255)]">
          {description}
        </p>
      </div>
    </button>
  );
};

export default ButtonOption;
