type Props = {
  icon: string;
  description: string;
  route: () => void;
};

//Componente que renderiza un boton
const ButtonOption = ({ icon, description, route }: Props) => {
  return (
    <button
      onClick={route}
      className="w-full flex justify-center items-center bg-transparent rounded-[8px] border-[2px] border-[rgba(25,118,210,0.5)] py-[8px] px-[4px] hover:bg-[rgba(25,118,210,0.08)] hover:border-[rgb(25,118,210)]"
    >
      <img className="w-[10%] md:" src={icon} alt="" />
      <div className="w-[70%]">
        <p className="text-[100%] md:text-[90%] xl:text-[100%] text-[rgb(25,118,210)]">
          {description}
        </p>
      </div>
    </button>
  );
};

export default ButtonOption;
