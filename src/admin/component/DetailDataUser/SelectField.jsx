import React, { useState, useEffect } from "react";
import Select from "react-select";

const SelectField = ({ label, name, value, onChange, isEditable, options }) => {
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    setCurrentValue(options.find((option) => option.value == parseInt(value)));
  }, [value, options]);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setCurrentValue(selectedOption);
      onChange({ target: { name, value: selectedOption.value } });
    } else {
      setCurrentValue(null);
      onChange({ target: { name, value: "" } });
    }
  };

  return (
    <div>
      <label className="block text-xs md:text-sm font-medium text-gray-700">{label}</label>
      <Select
        id={name}
        name={name}
        value={currentValue}
        onChange={handleChange}
        options={options}
        isDisabled={!isEditable}
        isClearable
        placeholder={`Pilih ${label}`}
        styles={{
          control: (provided) => ({
            ...provided,
            fontSize: "12px",
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: "12px",
          }),
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
      />
    </div>
  );
};

export default SelectField;
