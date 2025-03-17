import EnhancedTable from "./Table";
import useAuthStore from "../../stores/useAuthStore";

const DataUserNotFilled = ({userNotFilled}) => {
  const { token } = useAuthStore((state) => ({ token: state.token }));
  return (
    <div>
      <EnhancedTable token={token} userNotFilled={userNotFilled}  />
    </div>
  );
};

export default DataUserNotFilled;
