import React from "react";
import { LuUser } from "react-icons/lu";

const CardJumlahStats = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-white flex gap-2 items-center py-4 px-4 rounded-[10px] w-[15rem] shadow-md">
        <div>
          <LuUser className="text-[3rem]" />
        </div>
        <div className="h-[3rem]">
          <p className="text-[0.8rem] text-gray-500 thin">Total Karyawan</p>
          <p className="text-[1.5rem] medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-4 px-4 rounded-[10px] w-[15rem] shadow-md">
        <div>
          <LuUser className="text-[3rem]" />
        </div>
        <div className="h-[3rem]">
          <p className="text-[0.8rem] text-gray-500 thin">Total Karyawan</p>
          <p className="text-[1.5rem] medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-4 px-4 rounded-[10px] w-[15rem] shadow-md">
        <div>
          <LuUser className="text-[3rem]" />
        </div>
        <div className="h-[3rem]">
          <p className="text-[0.8rem] text-gray-500 thin">Total Karyawan</p>
          <p className="text-[1.5rem] medium">512</p>
        </div>
      </div>
      <div className="bg-white flex gap-2 items-center py-4 px-4 rounded-[10px] w-[15rem] shadow-md">
        <div>
          <LuUser className="text-[3rem]" />
        </div>
        <div className="h-[3rem]">
          <p className="text-[0.8rem] text-gray-500 thin">Total Karyawan</p>
          <p className="text-[1.5rem] medium">512</p>
        </div>
      </div>
    </div>
  );
};

export default CardJumlahStats;
