import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegCircleXmark } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";
import { Badge } from "flowbite-react";

export function formatResult(result) {
  if (result === "UNFIT") {
    return (
      <span>
        <Badge
          color="failure"
          className="w-fit mx-auto"
          icon={FaRegCircleXmark}
        ></Badge>
      </span>
    );
  } else if (result === "FIT_FOLLOW_UP") {
    return (
      <span>
        <Badge
          color="warning"
          className="w-fit mx-auto"
          icon={PiWarningCircleBold}
        ></Badge>
      </span>
    );
  } else {
    return (
      <span>
        <Badge
          color="success"
          className="w-fit mx-auto"
          icon={FaRegCircleCheck}
        ></Badge>
      </span>
    );
  }
}
