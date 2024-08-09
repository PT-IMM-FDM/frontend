import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";
import { Badge } from "flowbite-react";
import { Tooltip } from "@mui/material";


export function formatResult(result) {
    if (result == "UNFIT") {
      return (
        <Tooltip title="Unfit">
          <Badge
            color="failure"
            className="w-fit mx-auto"
            icon={FaRegCircleXmark}
          ></Badge>
        </Tooltip>
      );
    } else if (result == "FIT_FOLLOW_UP") {
      return (
        <Tooltip title="Fit Follow Up">
          <Badge
            color="warning"
            className="w-fit mx-auto"
            icon={PiWarningCircleBold}
          ></Badge>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Fit">
          <Badge
            color="success"
            className="w-fit mx-auto"
            icon={FaRegCircleCheck}
          ></Badge>
        </Tooltip>
      );
    }
  }