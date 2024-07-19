import React from "react";

const EditableField = ({ label, name, value, onChange, isEditable, type = "text" }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {isEditable ? (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 sm:text-[12px] leading-5 rounded-md"
      />
    ) : (
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled
        className="bg-gray-100 mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-600 sm:text-[12px] leading-5 rounded-md"
      />
    )}
  </div>
);

export default EditableField;
