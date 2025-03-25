import { useEffect, useState } from "react";
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
  countResult,
  countResultDepartemen,
  getUserNotFilled,
} from "../../api/fdm";
import SkeletonDashboard from "./SkeletonDashboard";
import { getTotalUsers } from "../../api/data-user";
import { DrawerUserUnfilled } from "../../component/DataUserNotFilled/DrawerUserUnfilled";
import CardUserUnfilled from "../../component/DashboardMenu/CardUserUnfilled";
import useDataFDM from "../../stores/useDataFDM";
import FilterButton from "../../component/DashboardMenu/FilterButton";
import Box from "@mui/material/Box";
import QuestionList from "../../component/DashboardMenu/QuestionList";
import { formatDateWithZeroPadding } from "../../utils/stringUtils";

const Dashboard = () => {
  const { user, setUser, token } = useAuthStore((state) => ({
    user: state.user,
    setUser: state.setUser,
    token: state.token,
  }));
  const [fdmResult, setFdmResult] = useState(0);
  const [fdmResultToday, setFdmResultToday] = useState(0);
  // const [totalResponden, setTotalResponden] = useState(0);
  // const [totalFitToday, setTotalFitToday] = useState(0);
  const [departementResult, setDepartementResult] = useState(0);
  const [totalKaryawan, setTotalKaryawan] = useState(0);
  const [userNotFilled, setUserNotFilled] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { filtersDashboard } = useDataFDM();
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Start loading
    const fetchFdmResult = async () => {
      try {
        const dataTotalKaryawan = await getTotalUsers(token);
        const dataResult = await countResult(token, filtersDashboard);
        const dataResultToday = await countResult(token, {
          startDate: formatDateWithZeroPadding(new Date().toLocaleDateString()),
          endDate: formatDateWithZeroPadding(new Date().toLocaleDateString()),
        });

        const dataUserNotFilled = await getUserNotFilled(token);
        let dataDepartmentResult = null;
        if (filtersDashboard.department.length > 0) {
          dataDepartmentResult = await countResultDepartemen(
            token,
            filtersDashboard
          );
        }

        setFdmResult(dataResult);
        setFdmResultToday(dataResultToday);
        setTotalKaryawan(dataTotalKaryawan);
        setUserNotFilled(dataUserNotFilled);
        setDepartementResult(dataDepartmentResult);
      } catch (error) {
        console.error("Failed to fetch FDM results", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFdmResult();
  }, [filtersDashboard, token]);

  const isDepartmentFilterApplied = filtersDashboard.department.length > 0;

  if (!user) {
    return <SkeletonDashboard />;
  }

  return (
    <div className="relative">
      {loading && (
        <Box
          sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 99,
            top: 0,
            left: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(243, 244, 246, 0.7)",
          }}>
          <img src="/Loader-1.gif" alt="loader" className="h-[5rem] z-10" />
        </Box>
      )}
      <MenuHeader
        role={user.role.name}
        title={"Dashboard Fit Daily Monitoring"}
        name={user.full_name}
        email={user.email}
      />
      <div className="grid grid-row-2 gap-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-y-4 xl:gap-x-4 xl:gap-y-0">
          <div className="col-span-3">
            <CardHero name={user.full_name} />
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-4 xl:gap-2">
              <CardJumlahStats
                label={"Total Karyawan"}
                value={totalKaryawan}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total FIT Today"}
                value={fdmResultToday?.resultFit || 0}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total FIT FOLLOW UP Today"}
                value={fdmResultToday?.resultFitFollowUp || 0}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total UNFIT Today"}
                value={fdmResultToday?.resultUnfit || 0}
                icon={LuUser}
              />
              <CardJumlahStats
                label={"Total Responden Today"}
                value={fdmResultToday.totalRespondent || 0}
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
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          <div className="flex flex-col col-span-2 gap-3">
            <DateRangePicker />
            <FilterButton />
            <div className="flex flex-col lg:flex-row gap-2">
              <DoughnutChart
                name={"Departemen"}
                dataResult={departementResult}
                position={"bottom"}
                noDepartmentFilterText={"Choose Filter Departments First"}
                noDataText={"No Data Available"}
                checkDepartmentFilter={true}
                isDepartmentFilterApplied={isDepartmentFilterApplied}
              />
              <DoughnutChart
                name={"FDM Result"}
                dataResult={fdmResult}
                position={"bottom"}
                noDepartmentFilterText={"Choose Filter Departments First"}
                noDataText={"No Data Available"}
                checkDepartmentFilter={false}
                isDepartmentFilterApplied={isDepartmentFilterApplied}
              />
            </div>
          </div>
          <div className="xl:col-span-2">
            <LineChart className="min-h-full" />
          </div>
        </div>
        <div className="mb-4">
          <QuestionList />
        </div>
        <DrawerUserUnfilled
          userNotFilled={userNotFilled}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;
