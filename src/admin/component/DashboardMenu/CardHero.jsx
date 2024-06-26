import React from "react";
import { Button } from "flowbite-react";

const CardHero = () => {
  return (
    <div>
      <div className="flex bg-purple-900 p-6 rounded-[10px] w-[63rem] text-white my-4 shadow-md">
        <div className="">
          <h1 className="mb-4 text-[24px] medium">Hello, Admin!</h1>
          <p className="w-[40rem] text-[16px] text-justify mb-10 thin">
            Selamat datang di Dashboard Fit Daily Monitoring PT IMM. Semoga hari
            Anda produktif dan menyenangkan. Ingatlah untuk rutin memantau dan
            mengelola data kesehatan pengguna dengan teliti.
          </p>
          <Button
            className="rounded-[5px] text-black bg-white hover:bg-gray-300 hover:text-purple-900 transition-all ease-in-out duration-200"
            color=""
          >
            Lihat Data Monitoring
          </Button>
        </div>
        <div className="bg-blue-500">
          <img
            className="absolute z-2 top-[3.9rem] right-[35rem] h-[20rem]"
            src="card-hero.svg"
            alt="hero-section-image"
          />
        </div>
      </div>
    </div>
  );
};

export default CardHero;
