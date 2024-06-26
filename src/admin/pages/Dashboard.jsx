import React from "react";
import Layout from "./Layout";
import MenuHeader from "../component/MenuHeader";
import CardHero from "../component/DashboardMenu/CardHero";
import CardJumlahStats from "../component/DashboardMenu/CardJumlahStats";
import DoughnutChart from "../component/DashboardMenu/ChartDoughnut";
import DateRangePicker from "../component/DashboardMenu/DateRangePicker";

const Dashboard = () => {
  return (
    <Layout>
      <MenuHeader />
      <div className="flex">
        <div>
          <CardHero />
          <CardJumlahStats />
        </div>
        <DateRangePicker />
      </div>
      <div className="flex gap-4">
        <DoughnutChart />
        <DoughnutChart />
        <DoughnutChart />
      </div>
    </Layout>
  );
};

export default Dashboard;
