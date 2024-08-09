import React from "react";
import useAuthStore from "../../stores/useAuthStore";
import Layout from "../../component/Layout";
import MenuHeader from "../../component/MenuHeader";
import DataMaster from "../../component/MasterDataCompany/DataMaster";

const MasterDataCompany = () => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  return (
    <>
      <MenuHeader
        role={user.role.name}
        title={"Master Data Perusahaan"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DataMaster />
      </div>
    </>
  );
};

export default MasterDataCompany;
