import React from "react";
import { Component as Sidebar } from "./Sidebar";
import { Component as Footer } from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex max-w-[1920px] h-screen min-h-screen ">
      <Sidebar />
      <div className="flex flex-col max-w-full w-screen bg-gray-100 p-4">
        <main className="h-full w-full">{children}</main>
        <Footer className="justify-self-end" />
      </div>
    </div>
  );
};

export default Layout;
