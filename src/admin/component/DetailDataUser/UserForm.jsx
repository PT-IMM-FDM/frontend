import React, { useState } from "react";
import EditableField from "./EditableField";
import SelectField from "./SelectField";
import { Button, Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import useAuthStore from "../../stores/useAuthStore";
import { resetPasswordToDefault } from "../../api/data-user";
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

  const handleCancel = () => {
    setUserData(originalUserData);
    setIsEditable(false);
  };

  const handleResetPassword = async () => {
    try {
      await resetPasswordToDefault(token, user_id);
      toast.success("Password has been reset to default.", {
        autoClose: 3000, // 3 seconds
        pauseOnHover: false, // Do not pause on hover
        position: "bottom-right"
      });
    } catch (error) {
      toast.error("Failed to reset password.", {
        autoClose: 3000, // 3 seconds
        pauseOnHover: false, // Do not pause on hover
        position: "bottom-right"
      });
    }
    setShowResetModal(false);
  };
  const { user } = useAuthStore((state) => ({ user: state.user }));
  const isAdmin = user.role.name === "Admin";

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
            <Button className="p-0" onClick={handleCancel} color="light">
              <p className="text-[12px]">Cancel</p>
            </Button>
          </div>
        ) : (
          isAdmin && (
            <div className="flex gap-2">
              <Button
                color="purple"
                className="p-0"
                onClick={() => setIsEditable(true)}
              >
                <p className="text-[12px]">Edit</p>
              </Button>
              <Button
                color="light"
                className="p-0 border-red-500 text-red-500"
                onClick={() => setShowResetModal(true)}
              >
                <p className="text-[12px]">Reset Password</p>
              </Button>
            </div>
          )
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
            { value: 2, label: "Full Viewer" },
            { value: 3, label: "Viewer" },
            { value: 4, label: "User" },
          ]}
        />
      </form>

      {/* Reset Password Modal */}
      <Modal
        show={showResetModal}
        onClose={() => setShowResetModal(false)}
        size="md"
        popup={true}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to reset this user's password to the default
              password?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleResetPassword}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowResetModal(false)}>
                No, cancel
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
