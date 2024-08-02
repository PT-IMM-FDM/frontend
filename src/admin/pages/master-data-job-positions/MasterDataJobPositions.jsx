import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import Layout from "../../component/Layout";
import MenuHeader from "../../component/MenuHeader";
import DataMaster from "../../component/MasterDataJobPosition/DataMaster";

const MasterDataJobPositions = () => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  return (
    <>
      <MenuHeader
        role={user.role.name}
        title={"Master Data Job Positions"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DataMaster />
      </div>
    </>
  );
};

export default MasterDataJobPositions;
