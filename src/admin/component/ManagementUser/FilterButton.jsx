"use client";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import { Button, Modal, Checkbox, Label } from "flowbite-react";
import { useState } from "react";

export default function FilterButton() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        className="h-[2.5rem] text-gray-700 bg-transparent"
        color="light"
        onClick={() => setOpenModal(true)}
        
      >
        <FilterListRoundedIcon sx={{ fontSize: "large" }} />
        <p className="ml-2 text-[12px]">Filters</p>
      </Button>
      <Modal size="md" dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Filter</Modal.Header>
        <Modal.Body className="h-[50vh]">
          {/* Filter Departemen */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Departemen</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 2
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 3
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 5
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 6
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 7
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Departemen 8
                </Label>
              </div>
            </div>
          </div>

          {/* Filter Posisi */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Posisi</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 2
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 3
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 5
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 6
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 7
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Posisi 8
                </Label>
              </div>
            </div>
          </div>

          {/* Hasil */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Hasil</p>
            <div className="flex grid-flow-col gap-4">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Fit
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Fit Follow Up
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Unfit
                </Label>
              </div>
            </div>
          </div>

            {/* Nama Perusahaan */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Nama Perusahaan</p>
            <div className="grid grid-cols-2 grid-flow-col gap-1">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  PT. Indominco Mandiri
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Kontraktor
                </Label>
              </div>
            </div>
          </div>

          {/* Perusahaan Kontraktor */}
          <div className="mb-4">
            <p className="mb-2 text-[14px] medium">Perusahaan Kontraktor</p>
            <div className="grid grid-rows-3 grid-flow-col gap-1">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Perusahaan 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Perusahaan 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Perusahaan 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Perusahaan 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="accept" />
                <Label htmlFor="accept" className="flex text-[12px]">
                  Perusahaan 1
                </Label>
              </div>
              
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-purple-800" onClick={() => setOpenModal(false)}>Use Filter</Button>
          <Button color="light" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
