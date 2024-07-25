import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import MenuHeader from "../../component/MenuHeader";
import DetailDataMonitoring from "../../component/DetailDataMonitoring/DetailDataMonitoring";

const DetailDataMonitoringPage = () => {
    const { user } = useAuthStore((state) => ({ user: state.user }));
  return (
    <>
      <MenuHeader
        title={"Data Pengguna"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DetailDataMonitoring />
      </div>
    </>
  );
};

export default DetailDataMonitoringPage;
