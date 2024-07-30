"use client";

import React from "react";
// import { Component as Navbar } from "../navbar";
// import { Component as Button } from "../button";
import { Component as Quest } from "../question";
import { Card } from "flowbite-react";
import useAuthStore from "../../../admin/stores/useAuthStore";

function FDMFormU() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  console.log(user)

  
  return (
    
    <div>
      <Card
        className="max-w-[500px] mx-auto mb-5 p-4"
      >
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Selamat datang {user.full_name}

        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Mohon mengisi informasi keadaan anda hari ini sebelum melakukan
          aktifitas kerja.
        </p>
      </Card>

      <Card className="max-w-[500px] mx-auto">
        <Quest />
      </Card>
    </div>
  );
}

export default FDMFormU;
