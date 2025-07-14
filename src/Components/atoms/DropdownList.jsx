import React from "react";

function DropdownList(props) {
  const {
    name,
    value,
    onChange,
    defaultValue,
    required = false,
    options = [],
    disabled = false,
  } = props;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      defaultValue={defaultValue}
      className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled ? "bg-gray-100 text-gray-600 cursor-not-allowed" : ""
      }`}
    >
      {options.map((opt, index) => (
        <option
          key={`${opt.value}-${opt.label}-${index}`}
          value={opt.value}
          disabled={opt.disabled}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default DropdownList;
