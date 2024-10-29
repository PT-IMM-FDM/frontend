import React from "react";
import { Navbar } from "flowbite-react";
import { useLocation } from "react-router-dom";
import useAuthStore from "../../admin/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import "../components/NavbarStyle.css";

export function Component() {
  const location = useLocation();
  const getLinkClass = (path) =>
    location.pathname === path
      ? "font-semibold text-purple-500 hover:text-purple-500"
      : "hover:text-purple-500";

  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const showDashboardLink =
    user?.role.name === "Admin" ||
    user?.role.name === "Viewer" ||
    user?.role.name === "Full Viewer";

  return (
    <Navbar fluid rounded className="mb-4 sticky top-0 z-50 bg-white">
      <Navbar.Brand className="px-3 lg:px-[]">
        <div className="flex items-end justify-center gap-1">
          <img src="/IMM.svg" className="mr-3 h-6 sm:h-8" alt="Logo IMM" />
          <div
            className="h-[1.5rem] lg:h-[2rem] w-[3px] "
            style={{ backgroundColor: "#44348c" }}
          ></div>
          <span className="text-[14px] ml-1 whitespace-nowrap lg:text-[20px] leading-0 font-semibold text-[#482f92] dark:text-white">
            Fit Daily Monitoring
          </span>
        </div>
      </Navbar.Brand>
      <div>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          href="/fdm-form"
          className={`${getLinkClass("/fdm-form")} navbar-link-hover`}
        >
          FDM Form
        </Navbar.Link>
        <Navbar.Link
          href="/riwayat-user"
          className={`${getLinkClass("/riwayat-user")} navbar-link-hover`}
        >
          Riwayat
        </Navbar.Link>
        <Navbar.Link
          href="/profile"
          className={`${getLinkClass("/profile")} navbar-link-hover`}
        >
          Profile
        </Navbar.Link>
        {showDashboardLink && (
          <Navbar.Link
            href="/admin/dashboard"
            className={`${getLinkClass("/admin/dashboard")} navbar-link-hover`}
          >
            Dashboard
          </Navbar.Link>
        )}
        <Navbar.Link
          className={`text-red-600 ${getLinkClass(
            "/logout"
          )} cursor-pointer navbar-link-hoverlog`}
          onClick={handleLogout}
        >
          Logout
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
