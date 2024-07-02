import React from "react";
import { LuUser } from "react-icons/lu";

const CardJumlahStats = () => {
  return (
    <div className="flex xl:gap-4">
      <div className="bg-white flex gap-2 items-center py-3 px-4 rounded-[10px] xl:w-[11rem] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem] 2xl:text-[3rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] 2xl:text-[0.8rem] text-gray-500 thin mb-[2px] leading-none">Total Karyawan</p>
          <p className="xl:text-[1.2rem] 2xl:text-[1.5rem] leading-none medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-3 px-4 rounded-[10px] xl:w-[11rem] 2xl:w-[15rem] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem] 2xl:text-[3rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] 2xl:text-[0.8rem] text-gray-500 mb-[2px] leading-none thin">Total Kontraktor</p>
          <p className="xl:text-[1.2rem] 2xl:text-[1.5rem] leading-none medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-3 px-4 rounded-[10px] xl:w-[11rem] 2xl:w-[15rem] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem] 2xl:text-[3rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] 2xl:text-[0.8rem] text-gray-500 mb-[2px] leading-none thin">Total Responden</p>
          <p className="xl:text-[1.2rem] 2xl:text-[1.5rem] leading-none medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-3 px-4 rounded-[10px]  xl:w-[11rem]  2xl:w-[15rem] shadow-md">
        <div>
          <LuUser className="xl:text-[2rem] 2xl:text-[3rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] 2xl:text-[0.8rem] text-gray-500 mb-[2px] leading-none thin">Total Karyawan</p>
          <p className="xl:text-[1.2rem] 2xl:text-[1.5rem] leading-none medium">512</p>
        </div>
      </div>
      
    </div>
  );
};

export default CardJumlahStats;
