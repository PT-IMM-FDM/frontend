import React, { useEffect, useState } from "react";
import EditableField from "./EditableField";
import SelectField from "./SelectField";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const UserForm = ({
  userData,
  setUserData,
  handleChange,
  handleSubmit,
  isEditable,
  setIsEditable,
  departments,
  jobPositions,
  employmentStatuses,
  companies,
  originalUserData, // New prop to pass originalUserData
}) => {
  const navigate = useNavigate();

  // Handle Cancel function to reset userData to originalUserData
  const handleCancel = () => {
    setUserData(originalUserData);
    setIsEditable(false);
  };

  return (
    <div className="p-4 pb-8 border rounded-md shadow-md bg-white">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <button onClick={() => navigate("/admin/data-pengguna")} className="">
            <IoArrowBack className="text-[20px]" />
          </button>
          <h2 className="text-md ml-2 font-medium">Detail Data Pengguna</h2>
        </div>
        {isEditable ? (
          <div className="flex space-x-2">
            <Button className="p-0" onClick={handleSubmit} color="purple">
              <p className="text-[12px]">Save Changes</p>
            </Button>
            <Button
              className="p-0"
              onClick={handleCancel} // Call handleCancel on Cancel button click
              color="light"
            >
              <p className="text-[12px]">Cancel</p>
            </Button>
          </div>
        ) : (
          <Button
            color="purple"
            className="p-0"
            onClick={() => setIsEditable(true)}
          >
            <p className="text-[12px]">Edit</p>
          </Button>
        )}
      </div>
      <form
        className="grid grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <EditableField
          label="Nama Lengkap"
          name="full_name"
          value={userData?.full_name || ""}
          onChange={handleChange}
          isEditable={isEditable}
        />
        <EditableField
          label="No. Telepon"
          name="phone_number"
          value={userData?.phone_number || ""}
          onChange={handleChange}
          isEditable={isEditable}
          type="tel"
        />
        <EditableField
          label="Email"
          name="email"
          value={userData?.email || ""}
          onChange={handleChange}
          isEditable={isEditable}
          type="email"
        />
        <SelectField
          label="Nama Perusahaan"
          name="company_id"
          value={userData?.company?.company_id || ""}
          onChange={handleChange}
          isEditable={isEditable}
          options={companies.map((c) => ({
            value: c.company_id,
            label: c.name,
          }))}
        />
        <SelectField
          label="Departemen"
          name="department_id"
          value={userData?.department?.department_id || ""}
          onChange={handleChange}
          isEditable={isEditable}
          options={departments.map((d) => ({
            value: d.department_id,
            label: d.name,
          }))}
        />
        <SelectField
          label="Posisi"
          name="job_position_id"
          value={
            userData?.job_position?.job_position_id
              ? String(userData?.job_position?.job_position_id)
              : ""
          }
          onChange={handleChange}
          isEditable={isEditable}
          options={jobPositions.map((p) => ({
            value: p.job_position_id,
            label: p.name,
          }))}
        />
        <SelectField
          label="Status Pekerjaan"
          name="employment_status_id"
          value={
            userData?.employment_status?.employment_status_id
              ? String(userData?.employment_status?.employment_status_id)
              : ""
          }
          onChange={handleChange}
          isEditable={isEditable}
          options={employmentStatuses.map((s) => ({
            value: s.employment_status_id,
            label: s.name,
          }))}
        />
        <EditableField
          label="Tanggal Lahir"
          name="birth_date"
          value={userData?.birth_date || "-"}
          onChange={handleChange}
          isEditable={isEditable}
          type="date"
        />
        <SelectField
          label="Role"
          name="role_id"
          value={userData?.role?.role_id ? String(userData?.role?.role_id) : ""}
          onChange={handleChange}
          isEditable={isEditable}
          options={[
            { value: 1, label: "Admin" },
            { value: 2, label: "Monitoring" },
            { value: 3, label: "User" },
          ]}
        />
      </form>
    </div>
  );
};

export default UserForm;
