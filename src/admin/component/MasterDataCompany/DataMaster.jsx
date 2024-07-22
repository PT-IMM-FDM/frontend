import React from "react";
import EnhancedTable from "./Table";
import useAuthStore from "../../stores/useAuthStore";

const DataMaster = () => {
  const { token } = useAuthStore((state) => ({ token: state.token }));

  return (
    <div>
      <EnhancedTable token={token} />
    </div>
  );
};

export default DataMaster;
