import React from "react";
import DetailDataUser from "../../component/DetailDataUser/DetailDataUser";
import useAuthStore from "../../stores/useAuthStore";
import MenuHeader from "../../component/MenuHeader";

const DetailDataUserPage = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }));
  return (
    <>
      <MenuHeader
        role={user.role.name}
        title={"Data Pengguna"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <DetailDataUser />
      </div>
    </>
  );
};

export default DetailDataUserPage;
