import React from "react";
import EnhancedTable from "../table";
import { Card, Button } from "flowbite-react";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

const HistoryUser = () => {
  return (
    <div>
      <Card className="mt-8 max-w-[800px] mx-auto">
        <EnhancedTable />
      </Card>
    </div>
  );
};

export default HistoryUser;
