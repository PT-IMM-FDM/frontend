import React from "react";
import EnhancedTable from "./Table";
import useAuthStore from "../../stores/useAuthStore";

const DataUserNotFilled = ({userNot}) => {
  const { token } = useAuthStore((state) => ({ token: state.token }));

  return (
    <div>
      <EnhancedTable token={token} />
    </div>
  );
};

export default DataUserNotFilled;
