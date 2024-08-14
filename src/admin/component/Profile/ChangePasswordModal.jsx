import React, { useState, useEffect } from 'react';
import { Modal, Label, TextInput, Alert, Button } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import useAuthStore from '../../../admin/stores/useAuthStore';

const ChangePasswordModal = ({ show, onClose }) => {
  const { token } = useAuthStore((state) => ({
    token: state.token,
  }));

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setError(null);
    }
  }, [show]);

  const handleSave = async () => {
    try {
      const requestData = {
        current_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update/password`,
        requestData,
        config
      );
      console.log('Password update success', response.data);
      onClose();
    } catch (error) {
      if (error.response && error.response.data) {
        const { code, message, status } = error.response.data;
        if (code === 400) {
          if (status === "WRONG_PASSWORD" || status === "PASSWORD_NOT_MATCH") {
            setError(message);
          }
        }
      } else {
        console.error('Password update failed', error);
      }
    }
  };

  return (
    <Modal className="z-[999]" show={show} onClose={onClose}>
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        {error && (
          <Alert color="failure" icon={HiInformationCircle} className='mb-2'>
            <span className="font-medium"></span> {error}
          </Alert>
        )}
        <div className="space-y-6">
          <div>
            <Label htmlFor="oldPasswordInput" className="block mb-2">
              Old Password
            </Label>
            <TextInput
              type="password"
              id="oldPasswordInput"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="newPasswordInput" className="block mb-2">
              New Password
            </Label>
            <TextInput
              type="password"
              id="newPasswordInput"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="confirmPasswordInput" className="block mb-2">
              Confirm Password
            </Label>
            <TextInput
              type="password"
              id="confirmPasswordInput"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="purple" className="text-white" onClick={handleSave}>Save</Button>
        <Button color="gray" className="text-gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePasswordModal;
