import React from "react";

const CardJumlahStats = ({label, value, icon : Icon}) => {
  return (
    <div className="flex xl:gap-4">
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px] shadow-md">
        <div>
          <Icon className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 mb-[2px] leading-none">{label}</p>
          <p className="xl:text-[1.2rem] leading-none font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CardJumlahStats;
