import checkIcon from "../../../../public/ic_check_white.svg";
import closeIcon from "../../../../public/ic_close_white.svg";

type Props = {
  estado: string;
};
//Componte que renderiza un Icono segun el estado que se le pase por props
const StateIcon: React.FC<Props> = ({ estado }: Props) => {
  return (
    <div
      className={`flex justify-center items-center w-[30px] h-[30px] rounded-[50%]  ${
        estado ? "bg-green-400" : "bg-red-400"
      }`}
    >
      <img
        className="w-[80%]"
        src={`${estado ? checkIcon : closeIcon}`}
        alt=""
      />
    </div>
  );
};

export default StateIcon;
