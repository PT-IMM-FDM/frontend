import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";
import { Badge } from "flowbite-react";

export function formatResult(result) {
  if (result === "UNFIT") {
    return (
      <span className="h-full flex items-center">
        <Badge
          color="failure"
          className="w-fit mx-auto"
          icon={FaRegCircleXmark}></Badge>
      </span>
    );
  } else if (result === "FIT_FOLLOW_UP") {
    return (
      <span className="h-full flex items-center">
        <Badge
          color="warning"
          className="w-fit mx-auto"
          icon={PiWarningCircleBold}></Badge>
      </span>
    );
  } else {
    return (
      <span className="h-full flex items-center">
        <Badge
          color="success"
          className="w-fit mx-auto"
          icon={FaRegCircleCheck}></Badge>
      </span>
    );
  }
}
