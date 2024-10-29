"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle, HiOutlineExclamationCircle } from "react-icons/hi";
import axios from 'axios';
import useAuthStore from '../../../admin/stores/useAuthStore';


const ConfirmationModal = ({ show, onClose, onConfirm }) => (
  <Modal show={show} size="md" onClose={onClose} popup>
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Apakah Anda yakin dengan perubahan?
        </h3>
        <div className="flex justify-center gap-4">
          <Button color="failure" onClick={() => { onConfirm(); onClose(); }}>
            Ya
          </Button>
          <Button color="gray" onClick={onClose}>
            Batal
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
);

const EditProfileModal = ({ show, onClose }) => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  const [fullName, setFullName] = useState(user.full_name || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [birthDate, setBirth] = useState(formatBirthDate(user.birth_date));
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (show) {
      setFullName(user.full_name || '');
      setPhoneNumber(user.phone_number || '');
      setEmail(user.email || '');
      setBirth(formatBirthDate(user.birth_date));
      setError(null);
    }
  }, [show, user]);

  const handleSave = async () => {
    try {
      const [day, month, year] = birthDate.split('/');
      const formattedBirthDate = `${year}-${month}-${day}`;

      const requestData = {
        full_name: fullName,
        phone_number: phoneNumber,
        birth_date: formattedBirthDate,
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
      console.log('Update success', response.data);
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
        console.error('Update failed', error);
      }
    }
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          {error && (
            <Alert color="failure" icon={HiInformationCircle} className='mb-2'>
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
                Phone number
              </Label>
              <TextInput
                type="text"
                id="phoneInput"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="birthInput" className="block mb-2">
                Birth date
              </Label>
              <TextInput
                type="text"
                id="birthInput"
                value={birthDate}
                onChange={(e) => setBirth(e.target.value)}
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
          <Button color="purple" className="text-white" onClick={() => setShowConfirmation(true)}>Save</Button>
          <Button color="gray" className="text-gray" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmationModal 
        show={showConfirmation} 
        onClose={() => setShowConfirmation(false)} 
        onConfirm={handleSave} 
      />
    </>
  );
};

const formatBirthDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};



// Modal for changing password
const ChangePasswordModal = ({ show, onClose }) => {
  const { token } = useAuthStore((state) => ({
    token: state.token,
  }));

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      setOldPassword('');
      setNewPassword('');
      setError(null);
    }
  }, [show]);

  const handleChangePassword = async () => {
    try {
      const requestData = {
        old_password: oldPassword,
        new_password: newPassword,
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
      console.log('Password change success', response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message);
      } else {
        console.error('Password change failed', error);
      }
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="purple" className="text-white" onClick={handleChangePassword}>Change Password</Button>
        <Button color="gray" className="text-gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Main component
const ManageU = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [openModal, setOpenModal] = useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 max-w-[800px] mx-auto">
      <Card>
        <div className='flex ml-auto gap-2'>
          <Button gradientMonochrome="purple" className="text-white w-fit" size="xs" onClick={() => setOpenModal(true)}>Edit</Button>
          <Button gradientMonochrome="failure" className="text-white w-fit" size="xs" onClick={() => setOpenChangePasswordModal(true)}>Change Password</Button>
        </div>
        <div className="flex flex-col space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex-1 md:mr-4">
              <Label htmlFor="nameInput" className="block my-2">
                Nama
              </Label>
              <TextInput
                type="text"
                id="nameInput"
                placeholder={user.full_name}
                disabled
              />
            </div>
            <div className="flex-1 mt-4 md:mt-0">
              <Label htmlFor="emailInput" className="block my-2">
                Email
              </Label>
              <TextInput
                type="text"
                id="emailInput"
                placeholder={user.email}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex-1 md:mr-4">
              <Label htmlFor="phoneInput" className="block my-2">
                Phone number
              </Label>
              <TextInput
                type="text"
                id="phoneInput"
                placeholder={user.phone_number}
                disabled
              />
              
            </div>
            <div className="flex-1 mt-4 md:mt-0 mr-3">
              <Label htmlFor="birthInput" className="block my-2">
                Birth Date
              </Label>
              <TextInput
                type="text"
                id="birthInput"
                placeholder={formatDate(user.birth_date)}
                disabled
              />
            </div>
            
            <div className="flex-1 mt-4 md:mt-0">
              <Label htmlFor="companyInput" className="block my-2">
                Company
              </Label>
              <TextInput
                type="text"
                id="companyInput"
                placeholder={user.company.name}
                disabled
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="departmentInput" className="block my-2">
                Department
              </Label>
              <TextInput
                type="text"
                id="departmentInput"
                placeholder={user.department.name}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="employmentStatusInput" className="block mb-2">
                Employment Status
              </Label>
              <TextInput
                type="text"
                id="employmentStatusInput"
                placeholder={user.employment_status.name}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="jobPositionInput" className="block pb-2">
                Job Position
              </Label>
              <TextInput
                type="text"
                id="jobPositionInput"
                placeholder={user.job_position.name}
                disabled
              />
            </div>
          </div>
        </div>
      </Card>
      <EditProfileModal show={openModal} onClose={() => setOpenModal(false)} />
      <ChangePasswordModal show={openChangePasswordModal} onClose={() => setOpenChangePasswordModal(false)} />
    </div>
  );
};

export default ManageU;
