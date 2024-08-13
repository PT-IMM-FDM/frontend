import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";
import { Badge } from "flowbite-react";
import { Tooltip } from "@mui/material";


export function formatResult(result) {
  if (result === "UNFIT") {
    return (
      <Tooltip title="Unfit">
        <span>
          <Badge
            color="failure"
            className="w-fit mx-auto"
            icon={FaRegCircleXmark}
          ></Badge>
        </span>
      </Tooltip>
    );
  } else if (result === "FIT_FOLLOW_UP") {
    return (
      <Tooltip title="Fit Follow Up">
        <span>
          <Badge
            color="warning"
            className="w-fit mx-auto"
            icon={PiWarningCircleBold}
          ></Badge>
        </span>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title="Fit">
        <span>
          <Badge
            color="success"
            className="w-fit mx-auto"
            icon={FaRegCircleCheck}
          ></Badge>
        </span>
      </Tooltip>
    );
  }
}
