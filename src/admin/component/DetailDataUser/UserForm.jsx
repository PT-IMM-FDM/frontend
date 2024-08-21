import React, { useState } from "react";
import EditableField from "./EditableField";
import SelectField from "./SelectField";
import { Button, Modal, ToggleSwitch } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useAuthStore from "../../stores/useAuthStore";
import { resetPasswordToDefault } from "../../api/data-user";
import { FaRegEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserForm = ({
  token,
  user_id,
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
  originalUserData,
}) => {
  const navigate = useNavigate();
  const [showResetModal, setShowResetModal] = useState(false);
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isAdmin = user.role.name === "Admin";

  const handleCancel = () => {
    setUserData(originalUserData);
    setIsEditable(false);
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordToDefault(token, user_id);
      toast.success("Password telah berhasil direset ke default.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      toast.error("Gagal mereset password.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
    }
    setShowResetModal(false);
  };

  const formatValue = (value) =>
    value !== null && value !== undefined ? value : "";

  return (
    <div className="p-4 pb-8 border rounded-md shadow-md bg-white">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/data-pengguna")}
            className="text-gray-600 hover:text-gray-800"
          >
            <IoArrowBack className="text-2xl" />
          </button>
          <h2 className="text-lg font-semibold ml-2">
            Detail Data Pengguna
          </h2>
        </div>
        {isEditable ? (
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} color="purple">
              Simpan Perubahan
            </Button>
            <Button onClick={handleCancel} color="gray">
              Batal
            </Button>
          </div>
        ) : (
          isAdmin && (
            <div className="flex gap-2">
              <Button color="purple" onClick={() => setIsEditable(true)}>
                <FaRegEdit className="text-lg mr-2" />
                Edit
              </Button>
              <Button
                color="red"
                onClick={() => setShowResetModal(true)}
              >
                Reset Password
              </Button>
            </div>
          )
        )}
      </div>

      {/* Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Editable Fields */}
        <EditableField
          label="Nama Lengkap"
          name="full_name"
          value={formatValue(userData?.full_name)}
          onChange={handleChange}
          isEditable={isEditable}
        />
        <EditableField
          label="No. Telepon"
          name="phone_number"
          value={formatValue(userData?.phone_number)}
          onChange={handleChange}
          isEditable={isEditable}
          type="tel"
        />
        <EditableField
          label="Email"
          name="email"
          value={formatValue(userData?.email)}
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
          value={userData?.birth_date || ""}
          onChange={handleChange}
          isEditable={isEditable}
          type="date"
        />
        <SelectField
          label="Role"
          name="role_id"
          value={
            userData?.role?.role_id ? String(userData?.role?.role_id) : ""
          }
          onChange={handleChange}
          isEditable={isEditable}
          options={[
            { value: 1, label: "Admin" },
            { value: 2, label: "Full Viewer" },
            { value: 3, label: "Viewer" },
            { value: 4, label: "User" },
          ]}
        />

        {/* Switch: Karyawan Tidak Aktif */}
        <div className="md:col-span-2 flex items-center justify-between">
          <label className="font-medium text-xs text-gray-700">
            Status Karyawan Aktif
          </label>
          <ToggleSwitch
            checked={userData?.is_active === true}
            onChange={() =>
              setUserData({
                ...userData,
                is_active: !userData?.is_active,
              })
            }
            disabled={!isEditable}
            color="purple"
          />
        </div>

        {/* Switch: Penerima Notifikasi */}
        <div className="md:col-span-2 flex items-center justify-between">
          <label className="font-medium text-xs text-gray-700">
            Penerima Notifikasi
          </label>
          <ToggleSwitch
            checked={userData?.get_notification === true}
            onChange={() =>
              setUserData({
                ...userData,
                get_notification: !userData?.get_notification,
              })
            }
            disabled={!isEditable}
            color="purple"
          />
        </div>
      </form>

      {/* Reset Password Modal */}
      <Modal
        show={showResetModal}
        onClose={() => setShowResetModal(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Apakah Anda yakin ingin mereset password pengguna ini ke default?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleResetPassword}>
                Ya, Saya Yakin
              </Button>
              <Button
                color="gray"
                onClick={() => setShowResetModal(false)}
              >
                Tidak, Batalkan
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default UserForm;
