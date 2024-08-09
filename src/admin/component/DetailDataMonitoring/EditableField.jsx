import React from "react";

const EditableField = ({
  label,
  name,
  value,
  onChange,
  isEditable,
  type = "text",
  endIcon,
  onEndIconClick,
}) => (
  <div className="flex flex-col mb-4 relative">
    <label
      htmlFor={name}
      className="mb-1 text-sm font-medium text-gray-700"
      style={{
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 1,
        overflow: 'hidden',
      }}
    >
      {label}
    </label>
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={!isEditable}
        className={`mt-1 block w-full border-gray-300 placeholder-gray-500 text-gray-900 sm:text-[12px] leading-5 rounded-md ${!isEditable ? 'bg-gray-100 text-gray-600' : ''}`}
      />
      {endIcon && (
        <span
          onClick={onEndIconClick}
          className="ml-2 cursor-pointer absolute right-2 bottom-3"
          aria-hidden="true"
        >
          {endIcon}
        </span>
      )}
    </div>
  </div>
);

export default EditableField;
