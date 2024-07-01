import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { format } from "date-fns";

const MenuHeader = ({ title }) => {
  const tanggalHariIni = formatDate();

  return (
    <div className="flex h-[4.5rem] justify-between items-center">
      <div>
        <div className="text-[2rem] text-purple-800 medium">Dashboard FDM</div>
        <p className="text-[14px] text-gray-500 normal">{tanggalHariIni}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="bold">ADMIN</p>
          <p className="text-[12px] thin">admin@gmail.com</p>
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
