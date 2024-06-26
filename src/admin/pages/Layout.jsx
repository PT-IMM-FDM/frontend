import React from "react";
import { Component as Sidebar } from "../component/Sidebar";
import { Component as Footer } from "../component/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex flex-col w-full p-4">
        <main className="h-screen">{children}</main>
        <Footer className="justify-self-end"/>
      </div>
    </div>
  );
};

export default Layout;
