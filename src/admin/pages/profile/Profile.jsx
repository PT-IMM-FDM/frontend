import React from "react";
import MenuHeader from "../../component/MenuHeader";
import useAuthStore from "../../stores/useAuthStore";
import ProfileWrapper from "../../component/Profile/ProfileWrapper";

const Profile = () => {
  const { user } = useAuthStore((state) => ({ user: state.user }));

  return (
    <>
      <MenuHeader
        role={user.role.name}
        title={"Profile"}
        name={user?.full_name}
        email={user?.email}
      />
      <div className="mt-2">
        <ProfileWrapper />
      </div>
    </>
  );
};

export default Profile;
