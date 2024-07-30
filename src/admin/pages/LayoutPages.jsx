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
import DetailDataUserPage from "./detail-data-user";
import DetailDataMonitoringPage from "./detail-data-monitoring";
import ManagementQuestionPage from "./management-question";

const LayoutPages = () => {
  return (
    <>
      <Layout>
        <main>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/data-monitoring" element={<Monitoring />} />
            <Route
              path="/data-monitoring/:user_id/:attendance_health_result_id"
              element={<DetailDataMonitoringPage />}
            />
            <Route path="/data-pengguna" element={<ManagementUser />} />
            <Route
              path="/data-pengguna/:user_id"
              element={<DetailDataUserPage />}
            />
            <Route path="/data-perusahaan" element={<MasterDataCompany />} />
            <Route
              path="/data-departemen"
              element={<MasterDataDepartments />}
            />
            <Route path="/data-posisi" element={<MasterDataJobPositions />} />
            <Route path="/data-status" element={<MasterDataStatusEmployee />} />
            <Route path="/manajemen-pertanyaan" element={<ManagementQuestionPage/>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
};

export default LayoutPages;
