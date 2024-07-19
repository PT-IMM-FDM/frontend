import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import Layout from "../../component/Layout";
import MenuHeader from "../../component/MenuHeader";
import DataMaster from "../../component/MasterDataStatusEmployee/DataMaster";

const MasterDataStatusEmployee = () => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  return (
    <>
      <MenuHeader
        title={"Master Data Status Employee"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DataMaster />
      </div>
    </>
  );
};

export default MasterDataStatusEmployee;
