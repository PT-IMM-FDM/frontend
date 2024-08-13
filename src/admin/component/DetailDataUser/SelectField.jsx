import React from "react";

const SelectField = ({ label, name, value, onChange, isEditable, options }) => (
  <div>
    <label className="block text-xs md:text-sm font-medium text-gray-700">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      style={{ fontSize: "12px" }}
      required
      disabled={!isEditable}
      className={`mt-1 block w-full border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs md:text-sm rounded-md ${!isEditable ? "bg-gray-100" : ""}`}
    >
      <option value="">Pilih {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
