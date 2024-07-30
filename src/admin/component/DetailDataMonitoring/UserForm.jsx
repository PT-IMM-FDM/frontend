import React, { useEffect, useState } from "react";
import EditableField from "./EditableField";
import SelectField from "./SelectField";
import { toCamelCase } from "../../utils/stringUtils";
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
          <button onClick={() => navigate("/admin/data-monitoring")}>
            <IoArrowBack className="text-[20px]" />
          </button>
          <h2 className="text-md ml-2 font-medium">Detail Data Monitoring</h2>
        </div>
        {/* {isEditable ? (
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
        )} */}
      </div>
      <form
        className="h-[62vh] overflow-y-auto px-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-sm mb-2 text-gray-400">Data Responden</h1>
        <section className="grid grid-cols-2 gap-y-2 gap-x-6 mb-5">
          <EditableField
            label="Nama Lengkap"
            name="full_name"
            value={userData?.[0]?.user?.full_name || ""}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="No. Telepon"
            name="phone_number"
            value={userData?.[0].user.phone_number || ""}
            onChange={handleChange}
            isEditable={isEditable}
            type="tel"
          />
          <EditableField
            label="Email"
            name="email"
            value={userData?.[0].user.email || ""}
            onChange={handleChange}
            isEditable={isEditable}
            type="email"
          />
          <EditableField
            label="Nama Perusahaan"
            name="company_id"
            value={userData?.[0].user.company?.name || ""}
            onChange={handleChange}
            isEditable={isEditable}
            type="text"
          />
          <EditableField
            label="Departemen"
            name="department_id"
            value={userData?.[0].user.department?.name || ""}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Posisi"
            name="job_position_id"
            value={userData?.[0].user.job_position.name}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Status Pekerjaan"
            name="employment_status_id"
            value={userData?.[0].user.employment_status?.name}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Status Kehadiran"
            name="attendance_status"
            value={
              userData?.[0].attendance_health_result.attendance_status || ""
            }
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Bekerja Shift/Non-Shift"
            name="shift"
            value={userData?.[0].attendance_health_result.shift || ""}
            onChange={handleChange}
            isEditable={isEditable}
            type="email"
          />
          <EditableField
            label="Apakah Driver?"
            name="is_driver"
            value={userData?.[0].attendance_health_result.is_driver || ""}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Nomor Lambung Kendaraan"
            name="vehicle_hull_number"
            value={
              userData?.[0].attendance_health_result.vehicle_hull_num || "-"
            }
            onChange={handleChange}
            isEditable={isEditable}
            type="text"
          />
          <EditableField
            label="Durasi Kerja"
            name="work_duration_plan"
            value={
              userData?.[0].attendance_health_result.work_duration_plan || ""
            }
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Hasil Fit Daily Monitoring"
            name="result"
            value={userData?.[0].attendance_health_result.result || ""}
            onChange={handleChange}
            isEditable={isEditable}
          />
          <EditableField
            label="Rekomendasi"
            name="recomendation"
            value={userData?.[0].attendance_health_result.recomendation || ""}
            onChange={handleChange}
            isEditable={isEditable}
          />
          {userData.map((data, index) => {
            return (
              <EditableField
                key={index}
                label={toCamelCase(data.question.question)}
                name={`question_answers[${index}].answer`}
                value={data.question_answer.question_answer}
                onChange={handleChange}
                isEditable={isEditable}
              />
            );
          })}
        </section>
      </form>
    </div>
  );
};

export default UserForm;
