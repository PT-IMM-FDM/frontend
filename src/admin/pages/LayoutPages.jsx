import React from "react";
import Layout from "../component/Layout";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Monitoring from "./monitoring";
import ManagementUser from "./management-user";
import MasterDataCompany from "./master-data-company";
import MasterDataDepartments from "./master-data-departments";
import MasterDataJobPositions from "./master-data-job-positions";
import MasterDataStatusEmployee from "./master-data-status-employee";
import NotFound from "./NotFound";
import "../../index.css";

const LayoutPages = () => {
  return (
    <>
      <Layout>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-monitoring" element={<Monitoring />} />
            <Route path="/data-pengguna" element={<ManagementUser />} />
            <Route path="/data-perusahaan" element={<MasterDataCompany />} />
            <Route
              path="/data-departemen"
              element={<MasterDataDepartments />}
            />
            <Route path="/data-posisi" element={<MasterDataJobPositions />} />
            <Route path="/data-status" element={<MasterDataStatusEmployee />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default LayoutPages;
