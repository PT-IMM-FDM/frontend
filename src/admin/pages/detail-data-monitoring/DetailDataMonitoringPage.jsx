import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import MenuHeader from "../../component/MenuHeader";
import DetailDataMonitoring from "../../component/DetailDataMonitoring/DetailDataMonitoring";
import { useParams } from "react-router-dom";

const DetailDataMonitoringPage = () => {
    const { user } = useAuthStore((state) => ({ user: state.user }));
    const { user_id, attendance_health_result_id } = useParams()

  return (
    <>
      <MenuHeader
        title={"Data Pengguna"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DetailDataMonitoring user_id={user_id} attendance_health_result_id={attendance_health_result_id}/>
      </div>
    </>
  )
};

export default DetailDataMonitoringPage;
