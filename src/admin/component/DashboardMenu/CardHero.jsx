import React from "react";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const CardHero = ({name}) => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/admin/data-monitoring")
  }
  return (
    <>
      <div className="flex bg-purple-900 w-full p-3 rounded-[10px] text-white my-4 shadow-md relative">
        <div className="relative z-10">
          <h1 className="mb-1 font-semibold">Hello, {name}!</h1>
          <p className="lg:w-[32rem] text-[13px] text-justify xl:mb-5">
            Selamat datang di Dashboard Fit Daily Monitoring PT IMM. Semoga hari
            Anda produktif dan menyenangkan. Ingatlah untuk rutin memantau dan
            mengelola data kesehatan pengguna dengan teliti.
          </p>
          <Button
            className="mt-4 xl:mt-0 rounded-[5px] text-black bg-white hover:bg-gray-300 hover:text-purple-900 transition-all ease-in-out duration-200"
            size="md"
            color=""
            onClick={handleNavigate}
          >
            Lihat Data Monitoring
          </Button>
        </div>
        <div className="hidden xl:block absolute z-0 top-[-0.9rem] right-[0rem] xl:h-[11.5rem] min-w-fit">
          <img
            className="w-full h-full object-cover rounded-[10px]"
            src='/Truck.png'
            alt="hero-section-image"
          />
        </div>
      </div>
    </>
  );
};

export default CardHero;
