"use client";

import { Sidebar } from "flowbite-react";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMonitorHeart } from "react-icons/md";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";
import { BiData } from "react-icons/bi";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import DomainAddRoundedIcon from "@mui/icons-material/DomainAddRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import { useState, useEffect } from "react";

export function Component() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const isAdmin = user.role.name === "Admin";

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Sidebar className="" aria-label="Sidebar with logo branding example">
      <div className="flex flex-col items-center justify-center mb-4">
        <img className="h-10 mb-1" src="/IMM.svg" alt="Logo PT IMM" />
        <p className="text-[12px] thin">Fit Daily Monitoring</p>
      </div>
      <Sidebar.Items className="flex flex-col">
        <Sidebar.ItemGroup className="">
          <Sidebar.Item
            // href="/admin/dashboard"
            onClick={() => navigate("/admin/dashboard")}
            icon={LuLayoutDashboard}
            className={`cursor-pointer normal text-sm hover:text-purple-800 hover:bg-gray-100 pr-2 ${
              activeItem === "/admin/dashboard"
                ? "text-purple-800 bg-gray-100"
                : ""
            }`}
          >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item
            // href="/admin/data-monitoring"
            onClick={() => navigate("/admin/data-monitoring")}
            icon={MdOutlineMonitorHeart}
            className={`cursor-pointer normal text-sm hover:text-purple-800 ${
              activeItem === "/admin/data-monitoring"
                ? "text-purple-800 bg-gray-100"
                : ""
            }`}
          >
            Data Monitoring
          </Sidebar.Item>
          <Sidebar.Item
            // href="/admin/data-pengguna"
            onClick={() => navigate("/admin/data-pengguna")}
            icon={HiOutlineUser}
            className={`cursor-pointer normal text-sm hover:text-purple-800 ${
              activeItem === "/admin/data-pengguna"
                ? "text-purple-800 bg-gray-100"
                : ""
            }`}
          >
            Data Pengguna
          </Sidebar.Item>
          {isAdmin && (
            <Sidebar.Item
              // href="/admin/data-pengguna"
              onClick={() => navigate("/admin/manajemen-pertanyaan")}
              icon={HiOutlineUser}
              className={`cursor-pointer normal text-sm hover:text-purple-800 ${
                activeItem === "/admin/manajemen-pertanyaan"
                  ? "text-purple-800 bg-gray-100"
                  : ""
              }`}
            >
              Kelola Pertanyaan
            </Sidebar.Item>
          )}
          <Sidebar.Collapse
            className="cursor-pointer text-sm hover:text-purple-800"
            icon={BiData}
            label="Master Data"
            open={activeItem.includes("/admin/")}
          >
            <Sidebar.Item
              icon={DomainAddRoundedIcon}
              className={`cursor-pointer normal text-[12px] hover:text-purple-800 ${
                activeItem === "/admin/data-perusahaan"
                  ? "text-purple-800 bg-gray-100"
                  : ""
              }`}
              // href="/admin/data-perusahaan"
              onClick={() => navigate("/admin/data-perusahaan")}
            >
              Perusahaan
            </Sidebar.Item>
            <Sidebar.Item
              icon={AccountTreeRoundedIcon}
              className={`cursor-pointer normal text-[12px] hover:text-purple-800 ${
                activeItem === "/admin/data-departemen"
                  ? "text-purple-800 bg-gray-100"
                  : ""
              }`}
              // href="/admin/data-departemen"
              onClick={() => navigate("/admin/data-departemen")}
            >
              Departemen
            </Sidebar.Item>
            <Sidebar.Item
              icon={BadgeRoundedIcon}
              className={`cursor-pointer normal text-[12px] hover:text-purple-800 ${
                activeItem === "/admin/data-posisi"
                  ? "text-purple-800 bg-gray-100"
                  : ""
              }`}
              // href="/admin/data-posisi"
              onClick={() => navigate("/admin/data-posisi")}
            >
              Posisi
            </Sidebar.Item>
            <Sidebar.Item
              icon={AssignmentIndRoundedIcon}
              className={`cursor-pointer normal text-[12px] hover:text-purple-800 ${
                activeItem === "/admin/data-status"
                  ? "text-purple-800 bg-gray-100"
                  : ""
              }`}
              // href="#"
              onClick={() => navigate("/admin/data-status")}
            >
              Status Pekerjaan
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item
            icon={HiOutlineLogout}
            className="cursor-pointer normal text-sm text-red-500"
            onClick={handleLogout}
          >
            Logout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
