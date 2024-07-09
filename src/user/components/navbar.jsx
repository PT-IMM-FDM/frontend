
"use client";

import { Navbar } from "flowbite-react";

export function Component() {
  return (
    <Navbar fluid rounded className="mb-4"> 
      <Navbar.Brand href="https://flowbite-react.com">
        <img src="IMM.svg" className="mr-3 h-6 sm:h-8" alt="Logo IMM" />
        <span className="pt-5 whitespace-nowrap text-l font-semibold dark:text-white">Fit Daily Monitoring</span>
      </Navbar.Brand>
      <div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="" active>
          FDM Form
        </Navbar.Link>
        <Navbar.Link href="riwayat">Riwayat</Navbar.Link>
        <Navbar.Link href="#">Pengaturan</Navbar.Link>
        <Navbar.Link className="text-red-600" href="#">Logout</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
