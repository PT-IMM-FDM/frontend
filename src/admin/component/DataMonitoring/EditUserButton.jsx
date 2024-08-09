import { IconButton, Tooltip } from "@mui/material";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { styled, tooltipClasses } from "@mui/material";

export function EditUserButton({ attendance_health_result_id, user_id }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/data-monitoring/${user_id}/${attendance_health_result_id}`);
    return;
  };

  const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

  return (
    <>
      <BootstrapTooltip title="Detail" className="text-[10px]" placement="top">
        <IconButton
          className="text-sm hover:text-purple-700 "
          onClick={handleClick} // Set openModal to true when edit button is clicked
        >
          <GrView className="text-[1rem] text-black hover:text-purple-700" />
        </IconButton>
      </BootstrapTooltip>
    </>
  );
}
