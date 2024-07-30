import React from "react";
import { LuUser } from "react-icons/lu";

const CardJumlahStats = () => {
  return (
    <div className="flex w-full xl:gap-4">
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 thin mb-[2px] leading-none">Total Karyawan</p>
          <p className="xl:text-[1.2rem] leading-none medium">100</p>
        </div>
      </div>
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 mb-[2px] leading-none thin">Total Kontraktor</p>
          <p className="xl:text-[1.2rem] leading-none medium">900</p>
        </div>
      </div>
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 mb-[2px] leading-none thin">Total Responden</p>
          <p className="xl:text-[1.2rem] leading-none medium">800</p>
        </div>
      </div>
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px]  shadow-md">
        <div>
          <LuUser className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 mb-[2px] leading-none thin">Total FIT</p>
          <p className="xl:text-[1.2rem] leading-none medium">512/800</p>
        </div>
      </div>
      
    </div>
  );
};

export default CardJumlahStats;
