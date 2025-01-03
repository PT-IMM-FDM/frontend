import { Label, TextInput } from "flowbite-react";

const UserDetailsCard = ({ user }) => {
  // Function to format the date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns month from 0 (January) to 11 (December), so we add 1 and pad with 0
    const day = date.getDate().toString().padStart(2, "0"); // getDate() returns the day of the month
    const year = date.getFullYear(); // getFullYear() returns the full 4-digit year

    return `${month}/${day}/${year}`;
  };

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
          <Label htmlFor="birthDateInput" className="block pb-2">
            Birth Date
          </Label>
          <TextInput
            type="text"
            id="birthDateInput"
            placeholder={formatDate(user.birth_date)} // Apply the formatDate function
            disabled
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
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
        <div>
          <Label htmlFor="departmentInput" className="block mb-2">
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
