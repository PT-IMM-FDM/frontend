import React from "react";
import { Component as Sidebar } from "./Sidebar";
import { Component as Footer } from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex max-w-[1920px] xl:h-screen min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-gray-100 p-4 overflow-auto">
        <main className="mb-6 xl:mb-0 h-full w-full">{children}</main>
        <footer className="z-10">
          <Footer className="xl:justify-self-end" />
        </footer>
      </div>
    </div>
  );
};

export default Layout;

