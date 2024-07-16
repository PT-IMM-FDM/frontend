import React from "react";
import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../admin/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function Component() {
  const location = useLocation();
  const getLinkClass = (path) => location.pathname === path ? "font-normal text-blue-500" : "";
  
    const { logout } = useAuthStore();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate("/login");
    };

  return (
    <Navbar fluid rounded className="mb-4 sticky top-0 z-50 bg-white">
      <Navbar.Brand>
        <img src="IMM.svg" className="mr-3 h-6 sm:h-8" alt="Logo IMM" />
        <span className="pt-5 whitespace-nowrap text-l font-semibold dark:text-white">Fit Daily Monitoring</span>
      </Navbar.Brand>
      <div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/fdm-form" className={getLinkClass("/fdm-form")}>
          FDM Form
        </Navbar.Link>
        <Navbar.Link href="/riwayat-user" className={getLinkClass("/riwayat-user")}>
          Riwayat
        </Navbar.Link>
        <Navbar.Link href="/pengaturan" className={getLinkClass("/pengaturan")}>
          Pengaturan
        </Navbar.Link>
        <Navbar.Link className={`text-red-600 ${getLinkClass("/logout")} cursor-pointer`} onClick={handleLogout}>
          Logout
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
