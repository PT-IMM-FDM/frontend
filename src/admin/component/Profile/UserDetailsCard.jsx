import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const UserDetailsCard = ({ user }) => {
  return (
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
  );
};

export default UserDetailsCard;
