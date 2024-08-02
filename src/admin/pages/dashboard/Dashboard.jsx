import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import MenuHeader from "../../component/MenuHeader";
import CardHero from "../../component/DashboardMenu/CardHero";
import CardJumlahStats from "../../component/DashboardMenu/CardJumlahStats";
import DoughnutChart from "../../component/DashboardMenu/ChartDoughnut";
import DateRangePicker from "../../component/DashboardMenu/DateRangePicker";
import LineChart from "../../component/DashboardMenu/ChartLine";
import useAuthStore from "../../stores/useAuthStore";
import { getCurrentLogin } from "../../api/auth";
import { LuUser } from "react-icons/lu";
import {
  countFilledToday,
  countResult,
  countResultDepartemen,
  getUserNotFilled,
} from "../../api/fdm";
import SkeletonDashboard from "./SkeletonDashboard";
import { getAllUser } from "../../api/data-user";
import { DrawerUserUnfilled } from "../../component/DataUserNotFilled/DrawerUserUnfilled";
import CardUserUnfilled from "../../component/DashboardMenu/CardUserUnfilled";
import useDataFDM from "../../stores/useDataFDM";
import FilterButton from "../../component/DashboardMenu/FilterButton";

const Dashboard = () => {
  const { user, setUser, token } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    token: state.token,
  }));
  const [fdmResult, setFdmResult] = useState(0);
  const [totalResponden, setTotalResponden] = useState(0);
  const [totalFitToday, setTotalFitToday] = useState(0);
  const [departementResult, setDepartementResult] = useState(0);
  const [totalKaryawan, setTotalKaryawan] = useState(0);
  const [userNotFilled, setUserNotFilled] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { filtersDashboard, setFiltersDashboard } = useDataFDM();

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

  const handleDrawerOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const fetchFdmResult = async () => {
      // const filter = {}
      const dataTotalFitToday = await countResult(token);
      const dataResult = await countResult(token, filtersDashboard);
      const dataResponden = await countFilledToday(token, filtersDashboard);
      const dataTotalKaryawan = await getAllUser(token);
      const dataUserNotFilled = await getUserNotFilled(token);
      const dataDepartmentResult = await countResultDepartemen(
        token,
        filtersDashboard
      );

      setTotalFitToday(dataTotalFitToday);
      setFdmResult(dataResult);
      setTotalResponden(dataResponden);
      setTotalKaryawan(dataTotalKaryawan.data.length);
      setUserNotFilled(dataUserNotFilled);
      setDepartementResult(dataDepartmentResult);
    };
    fetchFdmResult();
  }, [filtersDashboard]);

  const isDepartmentFilterApplied = filtersDashboard.department.length; // Replace with the actual condition for checking if department filter is applied

  if (!user) {
    return <SkeletonDashboard />;
  }

  return (
    <>
      <MenuHeader
        role={user.role.name}
        title={"Dashboard FDM"}
        name={user.full_name}
        email={user.email}
      />
      <div className="grid grid-row-2 gap-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <CardHero name={user.full_name} />
            <div className="grid grid-cols-4 gap-2">
              <CardJumlahStats
                label={"Total Karyawan"}
                value={totalKaryawan}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total Fit Today"}
                value={totalFitToday?.resultFit || 0}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total Responden Today"}
                value={totalResponden}
                icon={LuUser}
              />
              <CardUserUnfilled
                label={"Unsubmitted Respond"}
                value={userNotFilled?.length}
                icon={LuUser}
                handleClick={handleDrawerOpen}
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <DateRangePicker />
            <FilterButton />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <DoughnutChart
            name={"Departemen"}
            dataResult={departementResult}
            position={"bottom"}
            noDepartmentFilterText={"Choose Filter Departement First"}
            noDataText={"No Data Available"}
            checkDepartmentFilter={true}
            isDepartmentFilterApplied={isDepartmentFilterApplied}
          />
          <DoughnutChart
            name={"FDM Result"}
            dataResult={fdmResult}
            position={"bottom"}
            noDepartmentFilterText={"Choose Filter Departement First"}
            noDataText={"No Data Available"}
            checkDepartmentFilter={false}
            isDepartmentFilterApplied={isDepartmentFilterApplied}
          />
          <div className="col-span-2">
            <LineChart className="min-h-full" />
          </div>
        </div>
        <DrawerUserUnfilled
          userNotFilled={userNotFilled}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};

export default Dashboard;
