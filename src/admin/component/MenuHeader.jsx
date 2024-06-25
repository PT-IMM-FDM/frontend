import React from "react";
import { LuUserCircle2 } from "react-icons/lu";

const MenuHeader = ({ title }) => {
  return (
    <div className="flex w-full h-[4.5rem] justify-between items-center">
      <div>
        <div className="text-[2rem] text-purple-800 medium">Dashboard FDM</div>
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

export default MenuHeader;
