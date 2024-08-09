"use client";

import { Drawer } from "flowbite-react";
import React from "react";
import DataUserNotFilled from "./DataUserNotFilled";

export function DrawerUserUnfilled({ isOpen, setIsOpen, userNotFilled }) {
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Drawer
        className="w-[50rem] rounded-md"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header title="Users Not Filled Today" />
        <Drawer.Items>
          <DataUserNotFilled userNotFilled={userNotFilled} />
        </Drawer.Items>
      </Drawer>
    </>
  );
}
