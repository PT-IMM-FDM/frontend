import { useState, useEffect } from "react";
import { Modal, Label, TextInput, Alert, Button } from "flowbite-react";
import {
  HiInformationCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import useAuthStore from "../../../admin/stores/useAuthStore";

const ChangePasswordModal = ({ show, onClose }) => {
  const { token } = useAuthStore((state) => ({
    token: state.token,
  }));

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  // State untuk show/hide password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (show) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError(null);
    }
  }, [show]);

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      toast.warning("Password Not match", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      return;
    }
    try {
      const requestData = {
        new_password: newPassword,
        old_password: oldPassword,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/updatePassword`,
        requestData,
        config
      );
      toast.success("Update created successfully.", {
        autoClose: 3000,
        pauseOnHover: false,
        position: "bottom-right",
        theme: "colored",
      });
      console.log("Password update success", response.data);
      onClose();
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const { code, message, status } = error.response.data;
        if (code === 400) {
          if (status === "WRONG_PASSWORD" || status === "PASSWORD_NOT_MATCH") {
            setError(message);
          }
        }
      } else {
        console.error("Password update failed", error);
        toast.error("Changed password failed", {
          autoClose: 3000,
          pauseOnHover: false,
          position: "bottom-right",
          theme: "colored",
        });
      }
    }
  };

  return (
    <Modal className="z-[999]" show={show} onClose={onClose}>
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        {error && (
          <Alert color="failure" icon={HiInformationCircle} className="mb-2">
            <span className="font-medium"></span> {error}
          </Alert>
        )}
        <div className="space-y-6">
          {/* Old Password Input */}
          <div className="relative">
            <Label htmlFor="oldPasswordInput" className="block mb-2">
              Old Password
            </Label>
            <TextInput
              type={showOldPassword ? "text" : "password"}
              id="oldPasswordInput"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-7 text-xl flex items-center cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}>
              {showOldPassword ? (
                <HiOutlineEyeOff className="text-gray-500" />
              ) : (
                <HiOutlineEye className="text-gray-500" />
              )}
            </div>
          </div>

          {/* New Password Input */}
          <div className="relative">
            <Label htmlFor="newPasswordInput" className="block mb-2">
              New Password
            </Label>
            <TextInput
              type={showNewPassword ? "text" : "password"}
              id="newPasswordInput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-7 text-xl flex items-center cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}>
              {showNewPassword ? (
                <HiOutlineEyeOff className="text-gray-500" />
              ) : (
                <HiOutlineEye className="text-gray-500" />
              )}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Label htmlFor="confirmPasswordInput" className="block mb-2">
              Confirm Password
            </Label>
            <TextInput
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPasswordInput"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-7 text-xl flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? (
                <HiOutlineEyeOff className="text-gray-500" />
              ) : (
                <HiOutlineEye className="text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="purple" className="text-white" onClick={handleSave}>
          Save
        </Button>
        <Button color="gray" className="text-gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
