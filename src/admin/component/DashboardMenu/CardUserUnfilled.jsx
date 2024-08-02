import React from "react";
import { GrView } from "react-icons/gr";

const CardUserUnfilled = ({ label, value, icon: Icon, handleClick }) => {
  return (
    <div className="flex xl:gap-4">
      <div className="bg-white flex flex-grow gap-2 items-center py-3 px-4 rounded-[10px] shadow-md">
        <div>
          <Icon className="xl:text-[2rem]" />
        </div>
        <div>
          <p className="xl:text-[0.7rem] text-gray-500 thin mb-[2px] leading-none">
            {label}
          </p>
          <div className="flex items-center gap-2">
            <p className="xl:text-[1.2rem] leading-none medium">{value}</p>
            <GrView onClick={handleClick} className="hover:text-purple-700 cursor-pointer"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardUserUnfilled;
