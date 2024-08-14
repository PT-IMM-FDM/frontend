"use client";

import { Sidebar } from "flowbite-react";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMonitorHeart } from "react-icons/md";
import { BiData } from "react-icons/bi";
import AssignmentIndRoundedIcon from "@mui/icons-material/AssignmentIndRounded";
import DomainAddRoundedIcon from "@mui/icons-material/DomainAddRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import { FaFileWaveform } from "react-icons/fa6";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaClipboardQuestion } from "react-icons/fa6";

export function Component() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAdmin = user.role.name === "Admin";

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "Formulir FDM", path: "/fdm-form", icon: FaFileWaveform },
    { name: "Dashboard", path: "/admin/dashboard", icon: LuLayoutDashboard },
    { name: "Data Monitoring", path: "/admin/data-monitoring", icon: MdOutlineMonitorHeart },
    { name: "Data Pengguna", path: "/admin/data-pengguna", icon: HiOutlineUser },
    { name: "Kelola Pertanyaan", path: "/admin/manajemen-pertanyaan", icon: FaClipboardQuestion, adminOnly: true },
    {
      name: "Master Data", icon: BiData, subItems: [
        { name: "Perusahaan", path: "/admin/data-perusahaan", icon: DomainAddRoundedIcon },
        { name: "Departemen", path: "/admin/data-departemen", icon: AccountTreeRoundedIcon },
        { name: "Posisi", path: "/admin/data-posisi", icon: BadgeRoundedIcon },
        { name: "Status", path: "/admin/data-status", icon: AssignmentIndRoundedIcon }
      ]
    },
    { name: "Profile", path: "/admin/profile", icon: HiOutlineUser}
  ];

  const renderMenuItems = (isMobile = false) => (
    <Sidebar.Items className="flex flex-col">
      <Sidebar.ItemGroup>
        {menuItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          if (item.subItems) {
            return (
              <Sidebar.Collapse
                key={item.name}
                className="cursor-pointer text-sm font-medium hover:text-purple-800"
                icon={item.icon}
                label={item.name}
                open={activeItem.includes("/admin/")}
              >
                {item.subItems.map((subItem) => (
                  <Sidebar.Item
                    key={subItem.name}
                    icon={subItem.icon}
                    className={`cursor-pointer font-medium text-[12px] hover:text-purple-800 ${
                      activeItem === subItem.path ? "text-purple-800 bg-gray-100" : ""
                    }`}
                    onClick={() => {
                      navigate(subItem.path);
                      if (isMobile) setIsSidebarOpen(false);
                    }}
                  >
                    {subItem.name}
                  </Sidebar.Item>
                ))}
              </Sidebar.Collapse>
            );
          } else {
            return (
              <Sidebar.Item
                key={item.name}
                icon={item.icon}
                className={`cursor-pointer font-medium text-sm hover:text-purple-800 ${
                  activeItem === item.path ? "text-purple-800 bg-gray-100" : ""
                }`}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setIsSidebarOpen(false);
                }}
              >
                {item.name}
              </Sidebar.Item>
            );
          }
        })}
      </Sidebar.ItemGroup>
      <Sidebar.ItemGroup>
        <Sidebar.Item
          icon={HiOutlineLogout}
          className="cursor-pointer font-medium text-sm text-red-500"
          onClick={() => {
            handleLogout();
            if (isMobile) setIsSidebarOpen(false);
          }}
        >
          Logout
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  );

  return (
    <>
      {/* Hamburger Button for Mobile View */}
      <div className="absolute z-[999] flex p-4 lg:hidden">
        <button
          className="text-xl h-10 focus:outline-none"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 left-0 h-full bg-white transition-transform transform z-[9999] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:h-auto lg:bg-transparent lg:hidden`}
        aria-label="Sidebar with logo branding example"
      >
        <div className="flex flex-col items-center justify-center mb-4">
          <img className="h-10 mb-1" src="/IMM.svg" alt="Logo PT IMM" />
          {/* <p className="text-[12px]">Fit Daily Monitoring</p> */}
        </div>
        {renderMenuItems(true)}
      </Sidebar>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar aria-label="Sidebar with logo branding example">
          <div className="flex flex-col items-center justify-center mb-4">
            <img className="h-10 mb-1" src="/IMM.svg" alt="Logo PT IMM" />
            {/* <p className="text-[12px]">Fit Daily Monitoring</p> */}
          </div>
          {renderMenuItems()}
        </Sidebar>
      </div>
    </>
  );
}
