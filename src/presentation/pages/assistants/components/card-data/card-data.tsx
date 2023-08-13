import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import icAssistant from "../../../../../../public/ic_profile.svg";
type Props = {
  data: any;
};

//Componente que renderiza un card
const CardData: React.FC<Props> = ({ data }: Props) => {
  return (
    <>
      {/* Mapeo de la data pasada por props, para renderizar cards dinstintos */}
      {data.map((e: any, index: any) => (
        <Card
          key={index}
          className="w-full md:w-[48%] md:max-w-[48%]"
          sx={{
            display: "flex",
            background: "rgba(255,255,255,0.5)",
            borderRadius: "8px",
            border: "1px solid #c9c9c9",
            boxShadow: "6px 5px 10px -3px rgba(0,0,0,0.56)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: `100%`,
            }}
          >
            <div className="flex items-center gap-[10px] border border-b-[#95959581] px-[20px]">
              <div className="flex justify-center items-center w-[50px] h-[50px] rounded-[50%] bg-sky-200">
                <img className="w-[60%]" src={icAssistant} alt="Asistente" />
              </div>
              <div className="flex flex-col py-[20px] ">
                <span className="text-[12px] font-bold">NOMBRE</span>
                <span className="text-[100%] md:text-[20px] ">{e.cliente}</span>
              </div>
            </div>
            <div className="flex flex-col items-center gap-[20px] w-full p-[20px] text-center">
              <div className="flex flex-col gap-[5px]">
                <span className="text-[12px] font-bold ">ENTRADA</span>
                <span className="text-[30px] xl:text-[35px] bg-[rgba(118,154,195,0.55)] p-[5px] rounded-[8px] min-w-[200px] ">{`${e.entrada}`}</span>
              </div>
              <div className="flex w-full justify-center gap-[20px]">
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold ">COMPRADOS</span>
                  <span className="text-gray-500 ">{e.comprados}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold ">ASISTENTES</span>
                  <span className=" text-gray-500">{e.asistentes}</span>
                </div>
              </div>
            </div>
          </Box>
        </Card>
      ))}
    </>
  );
};

export default CardData;
