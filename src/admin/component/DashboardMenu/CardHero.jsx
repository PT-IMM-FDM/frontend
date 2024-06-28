import React from "react";
import { Button } from "flowbite-react";

const CardHero = () => {
  return (
    <>
      <div className="flex bg-purple-900 xl:p-3 2xl:p-6 rounded-[10px] xl:w-[40vw] 2xl:w-[53.8vw] text-white my-4 shadow-md">
        <div>
          <h1 className="xl:mb-2 2xl:mb-4 xl:text-[16px] 2xl:text-[24px] medium">Hello, Admin!</h1>
          <p className="lg:w-[20rem] 2xl:w-[40rem] md:text-[12px] 2xl:text-[16px] text-justify xl:mb-5 2xl:mb-10 thin">
            Selamat datang di Dashboard Fit Daily Monitoring PT IMM. Semoga hari
            Anda produktif dan menyenangkan. Ingatlah untuk rutin memantau dan
            mengelola data kesehatan pengguna dengan teliti.
          </p>
          <Button
            className="rounded-[5px] text-black bg-white hover:bg-gray-300 hover:text-purple-900 transition-all ease-in-out duration-200"
            size="md"
            color=""
          >
            Lihat Data Monitoring
          </Button>
        </div>
        <div className="bg-blue-500 sm:hidden xl:block">
          <img
            className="absolute z-2 xl:top-[4.5rem] 2xl:top-[3.9rem] xl:right-[35.2rem] 2xl:right-[35rem] xl:h-[15rem] 2xl:h-[20rem]"
            src="card-hero.svg"
            alt="hero-section-image"
          />
        </div>
      </div>
    </>
  );
};

export default CardHero;
