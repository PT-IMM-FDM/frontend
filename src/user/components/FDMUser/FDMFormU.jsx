"use client";

import React, { useState } from "react";
import { Card } from "flowbite-react";
import useAuthStore from "../../../admin/stores/useAuthStore";
import { Modal, Button } from "flowbite-react";
import { Component as Quest } from "../question";

function FDMFormU() {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [openModal, setOpenModal] = useState(true);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <div>
      <Card className="max-w-[500px] mx-auto mb-5 p-4">
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Selamat datang {user.full_name}
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Mohon mengisi informasi keadaan kesehatan Anda hari ini sebelum Anda bekerja atau sebelum memasuki area PT. Indominco Mandiri
        </p>
        <a
          href="#"
          onClick={handleLinkClick}
          className="inline font-medium text-blue-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-cyan-500"
        >
          TANDA DAN GEJALA FATIGUE
        </a>
      </Card>

      <Card className="max-w-[500px] mx-auto">
        <Quest />
      </Card>

      {/* Modal Component */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <img src="/rekomendasi.svg" alt="Fatigue Symptoms" className="w-full" />
        </Modal.Body>
        <Modal.Footer>
          <Button gradientMonochrome="purple" onClick={() => setOpenModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FDMFormU;
