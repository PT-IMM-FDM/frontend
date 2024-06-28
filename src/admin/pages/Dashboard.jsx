import React from "react";
import Layout from "./Layout";
import MenuHeader from "../component/MenuHeader";
import CardHero from "../component/DashboardMenu/CardHero";
import CardJumlahStats from "../component/DashboardMenu/CardJumlahStats";
import DoughnutChart from "../component/DashboardMenu/ChartDoughnut";
import DateRangePicker from "../component/DashboardMenu/DateRangePicker";
import LineChart from "../component/DashboardMenu/ChartLine";

const Dashboard = () => {
  return (
    <Layout>
      <MenuHeader />
      <div className="flex gap-2">
        <div className="">
          <CardHero />
          <CardJumlahStats />
        </div>
        <DateRangePicker />
      </div>
      <div className="flex gap-4">
        <DoughnutChart />
        <DoughnutChart />
        <LineChart/>
      </div>
    </Layout>
  );
};

export default Dashboard;
