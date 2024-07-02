import React from "react";
import { Component as Sidebar } from "../component/Sidebar";
import { Component as Footer } from "../component/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex max-w-fit bg-red-200 min-h-screen ">
      <div>
        <Sidebar />
      </div>
      <div className="flex flex-col max-w-full w-screen bg-gray-100 p-4">
        <main className="h-full w-full">{children}</main>
        <Footer className="justify-self-end" />
      </div>
    </div>
  );
};

export default Layout;
