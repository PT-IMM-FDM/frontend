import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { format } from "date-fns";

const MenuHeader = ({ title, name, email }) => {
  const tanggalHariIni = formatDate();

  return (
    <div className="flex py-1 justify-between items-center">
      <div>
        <div className="text-[1.5rem] text-purple-800 medium">{title}</div>
        <p className="text-[14px] text-gray-500 normal">{tanggalHariIni}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="bold">{name}</p>
          <p className="text-[12px] thin">{email}</p>
        </div>
        <LuUserCircle2 className="text-[2.5rem]" />
      </div>
    </div>
  );
};

const formatDate = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd MMM yyyy");
  return formattedDate;
};

export default MenuHeader;
