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
import { Skeleton } from "@mui/material";

const Dashboard = () => {
  const { user, setUser, token } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    token: state.token,
  }));

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && token) {
        try {
          const userData = await getCurrentLogin(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUser();
  }, [user, token, setUser]);

  if (!user) {
    return (
      <>
        <MenuHeader title={"Dashboard FDM"} />
        <div className="grid grid-row-2 gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={180} className="mb-4" />
              <div className="grid grid-cols-3 gap-4">
                <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={60} />
                <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={60} />
                <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={60} />
              </div>
            </div>
            <div className="flex">
              <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={255} width="100%" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={300} />
            <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={300} />
            <Skeleton animation="wave" sx={{bgcolor: "grey.200"}} variant="rounded" height={300} className="col-span-2" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MenuHeader title={"Dashboard FDM"} name={user.full_name} email={user.email} />
      <div className="grid grid-row-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <CardHero name={user.full_name} />
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
    </>
  );
};

export default Dashboard;
