import React from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { format } from "date-fns";
import { Tooltip, Badge } from "flowbite-react";

const MenuHeader = ({ role, title, name, email }) => {
  const tanggalHariIni = formatDate();

  return (
    <div className="flex py-1 justify-between items-center">
      <div>
        <div className="text-[1.5rem] text-purple-800 font-semibold">{title}</div>
        <p className="text-[14px] text-gray-500 font-medium">{tanggalHariIni}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="font-semibold">{name}</p>
          <p className="text-[12px]">
            {email || "Email hasn't been added"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <LuUserCircle2 className="text-[2rem]" />
          <Badge color="purple" className="w-fit px-2 text-[10px]">
            {role}
          </Badge>
        </div>
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
