import React from "react";
import EnhancedTable from "./Table";
import useAuthStore from "../../stores/useAuthStore";

const DataUserNotFilled = ({userNotFilled}) => {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  // console.log(userNotFilled)
  return (
    <div>
      <EnhancedTable token={token} userNotFilled={userNotFilled}  />
    </div>
  );
};

export default DataUserNotFilled;
