"use client";

import { Drawer } from "flowbite-react";
import React from "react";
import DataUserNotFilled from "./DataUserNotFilled";

export function DrawerUserUnfilled({ isOpen, setIsOpen, userNotFilled }) {
  const handleClose = () => setIsOpen(false);

  // console.log(userNotFilled)

  return (
    <>
      <Drawer
        className="w-[50rem]"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header title="Users Not Filled Today" />
        <Drawer.Items>
          <DataUserNotFilled userNotFilled={userNotFilled}/>
          {/* <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-4 text-left text-xs font-medium text-gray-500  dark:text-gray-400"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 text-left text-xs font-medium text-gray-500  dark:text-gray-400"
                  >
                    Job Position
                  </th>
                  <th
                    scope="col"
                    className="px-4 text-left text-xs font-medium text-gray-500  dark:text-gray-400"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    className="px-4 text-left text-xs font-medium text-gray-500  dark:text-gray-400"
                  >
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-4 text-left text-xs font-medium text-gray-500  dark:text-gray-400"
                  >
                    Employment Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                {userNotFilled.map((user) => (
                  <tr key={user.user_id}>
                    <td className="px-4 py-2 whitespace-nowrap text-xs font-medium text-gray-900 dark:text-white">
                      {user.full_name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {user.job_position.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {user.department.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {user.company.name}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                      {user.employment_status.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
