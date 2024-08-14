import React, { useState, useEffect } from "react";
import { Modal, Label, TextInput, Alert, Button } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import axios from "axios";
import useAuthStore from "../../../admin/stores/useAuthStore";
import ConfirmationModal from "./ConfirmationModal"

const EditProfileModal = ({ show, onClose }) => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  const [fullName, setFullName] = useState(user.full_name || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || "");
  const [email, setEmail] = useState(user.email || "");
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (show) {
      setFullName(user.full_name || "");
      setPhoneNumber(user.phone_number || "");
      setEmail(user.email || "");
      setError(null);
    }
  }, [show, user]);

  const handleSave = async () => {
    try {
      const requestData = {
        full_name: fullName,
        phone_number: phoneNumber,
        email: email,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update/me`,
        requestData,
        config
      );
      console.log("Update success", response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        const { code, message, status } = error.response.data;
        if (code === 400) {
          if (status === "EMAIL_EXISTS" || status === "PHONE_NUMBER_EXISTS") {
            setError(message);
          }
        }
      } else {
        console.error("Update failed", error);
      }
    }
  };

  return (
    <>
      <Modal className="z-[999]" show={show} onClose={onClose}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          {error && (
            <Alert color="failure" icon={HiInformationCircle} className="mb-2">
              <span className="font-medium"></span> {error}
            </Alert>
          )}
          <div className="space-y-6">
            <div>
              <Label htmlFor="nameInput" className="block mb-2">
                Nama
              </Label>
              <TextInput
                type="text"
                id="nameInput"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phoneInput" className="block mb-2">
                Phone Number
              </Label>
              <TextInput
                type="text"
                id="phoneInput"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emailInput" className="block mb-2">
                Email
              </Label>
              <TextInput
                type="email"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="purple"
            className="text-white"
            onClick={() => setShowConfirmation(true)}
          >
            Save
          </Button>
          <Button color="gray" className="text-gray" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal
        show={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleSave}
        message="Are you sure you want to save these changes?"
      />
    </>
  );
};

export default EditProfileModal;
