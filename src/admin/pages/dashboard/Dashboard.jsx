import React, { useEffect } from "react";
import Layout from "../../component/Layout";
import MenuHeader from "../../component/MenuHeader";
import CardHero from "../../component/DashboardMenu/CardHero";
import CardJumlahStats from "../../component/DashboardMenu/CardJumlahStats";
import DoughnutChart from "../../component/DashboardMenu/ChartDoughnut";
import DateRangePicker from "../../component/DashboardMenu/DateRangePicker";
import LineChart from "../../component/DashboardMenu/ChartLine";
import useAuthStore from "../../stores/useAuthStore";
import { getCurrentLogin } from "../../api/auth";

const Dashboard = () => {
  const { user, setUser, token } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    token: state.token,
  }));

  useEffect(() => {
    const getCurrentUser = async () => {
      const dataUser = await getCurrentLogin(token)
      // console.log(dataUser)
      setUser(dataUser);
    };
    getCurrentUser()
  }, [token]);

  console.log(user)
  // console.log(token)

  return (
    <Layout>
      <MenuHeader title={"Dashboard FDM"} name={user.full_name} email={user.email}/>
      <div className="grid grid-row-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <CardHero name={user.full_name}/>
            <CardJumlahStats />
          </div>
          <div className="flex">
            <DateRangePicker />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <DoughnutChart />
          <DoughnutChart />
          <div className="col-span-2">
            <LineChart className="min-h-full" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
