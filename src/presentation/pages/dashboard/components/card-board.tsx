import React from "react";

type Props = {
  title: string;
  color: number;
  accessView: () => void;
};
const cardBoard: React.FC<Props> = ({ title, color, accessView }: Props) => {
  return (
    <>
      <div
        onClick={accessView}
        className={`flex items-center justify-center w-[100%] h-[30vh] md:w-[50%] md:h-[50vh] text-[20px] md:text-[50px]  hover:bg-slate-500 border-slate-100 border-[1px] font-bold cursor-pointer ${
          color == 1
            ? "bg-slate-800 text-white  hover:text-slate-200 hover:text-[30px] md:hover:text-[70px]"
            : "bg-slate-400 text-slate-800  hover:text-slate-200 hover:text-[30px] md:hover:text-[70px]"
        } `}
      >
        <p className="text-center">{title}</p>
      </div>
    </>
  );
};
export default cardBoard;
