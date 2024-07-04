"use client";

import { Sidebar } from "flowbite-react";
import {
  HiOutlineOfficeBuilding,
  HiOutlineUser,
  HiOutlineLogout
} from "react-icons/hi";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineMonitorHeart } from "react-icons/md";
import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export function Component() {
  const { logout } = useAuthStore();
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/login-admin')
  }

  return (
    <Sidebar className="" aria-label="Sidebar with logo branding example">
      <div className="flex justify-center">
        <img className="h-10 mb-4" src="/IMM.svg" alt="Logo PT IMM" />
      </div>
        <Sidebar.Items className="flex flex-col justify-between">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/dashboard" icon={LuLayoutDashboard} className="normal text-sm hover:text-purple-800 hover:bg-gray-100">
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item
              href="/data-monitoring"
              icon={MdOutlineMonitorHeart}
              className="normal text-sm"
            >
              Data Monitoring
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiOutlineUser} className="normal text-sm">
              Data Pengguna
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiOutlineOfficeBuilding} className="normal text-sm">
              Manajemen Perusahaan
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiOutlineLogout} className="normal text-sm text-red-500">
              <div onClick={handleLogout}>
                Logout
              </div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  );
}
