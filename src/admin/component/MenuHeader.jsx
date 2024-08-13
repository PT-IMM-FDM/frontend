import React, { useState } from "react";
import { LuUserCircle2 } from "react-icons/lu";
import { format } from "date-fns";
import { Tooltip, Badge } from "flowbite-react";
import { id } from "date-fns/locale";

const MenuHeader = ({ role, title, name, email }) => {
  const tanggalHariIni = formatDate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex py-0 lg:py-1 justify-between items-center">
      <div className="ml-8 lg:ml-0">
        <div className="text-[1rem] lg:text-[1.5rem] text-purple-900 font-semibold">{title}</div>
        <p className="text-[.8rem] lg:text-[14px] text-gray-500 font-medium">{tanggalHariIni}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-right hidden lg:block">
          <p className="font-semibold">{name}</p>
          <p className="text-[12px]">
            {email || "Email hasn't been added"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <LuUserCircle2 className="text-[2rem] cursor-pointer" onClick={toggleMenu} />
          <Badge color="purple" className="w-fit px-2 text-[10px]">
            {role}
          </Badge>
          {/* Dropdown menu */}
          {isMenuOpen && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50 lg:hidden">
              <p className="font-semibold mb-1">{name}</p>
              <p className="text-[12px] mb-3">{email || "Email hasn't been added"}</p>
              <button
                className="w-full bg-white border-red-500 border text-red-500 text-sm font-medium py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const formatDate = () => {
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd MMMM yyyy", { locale: id });
  return formattedDate;
};

export default MenuHeader;
