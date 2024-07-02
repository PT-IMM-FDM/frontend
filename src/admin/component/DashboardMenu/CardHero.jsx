import React from "react";
import { Button } from "flowbite-react";

const CardHero = () => {
  return (
    <>
      <div className="flex bg-purple-900 w-[47.5rem] p-3 rounded-[10px] text-white my-4 shadow-md relative">
        <div className="relative z-10">
          <h1 className="mb-1 medium">Hello, Admin!</h1>
          <p className="lg:w-[32rem] text-[13px] text-justify xl:mb-5 2xl:mb-10 thin">
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
        <div className="sm:hidden xl:block absolute z-0 top-[-2.55rem] right-[-1.8rem] xl:h-[14.4rem] 2xl:h-[20rem] min-w-fit">
          <img
            className="w-full h-full object-cover rounded-[10px]"
            src="card-hero.svg"
            alt="hero-section-image"
          />
        </div>
      </div>
    </>
  );
};

export default CardHero;
