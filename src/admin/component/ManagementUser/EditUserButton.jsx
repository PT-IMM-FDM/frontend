import { Button, Tooltip } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function EditUserButton({ user_id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/data-pengguna/${user_id}`);
    return
  };

  return (
    <>
      <Tooltip content="Edit" className="text-[10px]">
        <Button
          className="text-sm p-0 border-none bg-transparent"
          size="xs"
          color="light"
          onClick={handleClick} // Set openModal to true when edit button is clicked
        >
          <FaRegEdit className="text-[1rem] hover:text-purple-700" />
        </Button>
      </Tooltip>
    </>
  );
}
