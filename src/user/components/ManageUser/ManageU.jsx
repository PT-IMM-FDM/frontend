"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Label, TextInput, Alert } from 'flowbite-react';
import { HiInformationCircle } from "react-icons/hi";
import axios from 'axios';
import useAuthStore from '../../../admin/stores/useAuthStore';

const EditProfileModal = ({ show, onClose }) => {
  const { user, token } = useAuthStore((state) => ({
    user: state.user,
    token: state.token,
  }));

  const [fullName, setFullName] = useState(user.full_name || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number || '');
  const [email, setEmail] = useState(user.email || '');
  const [error, setError] = useState(null); // State untuk menyimpan pesan kesalahan

  useEffect(() => {
    if (show) {
      setFullName(user.full_name || '');
      setPhoneNumber(user.phone_number || '');
      setEmail(user.email || '');
      setError(null); // Reset error saat modal dibuka
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
      console.log('Update success', response.data);
      onClose();
      window.location.reload(); // Refresh halaman setelah menyimpan data
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
        <Button color="purple" className="text-white" onClick={handleSave}>Save</Button>
        <Button color="gray"className="text-gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ManageU = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));

  const [openModal, setOpenModal] = useState(false);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-8 max-w-[800px] mx-auto">
      <Card>
        <Button color="purple" className=" text-white w-fit ml-auto" size="xs" onClick={() => setOpenModal(true)}>Edit</Button>
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
    </div>
  );
};

export default ManageU;
