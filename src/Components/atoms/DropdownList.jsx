import React from "react";

function DropdownList(props) {
  const {
    name,
    value,
    onChange,
    required = false,
    options = [],
    disabled = false, // fixed here
  } = props;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`w-full px-4 py-2 rounded-md border ${
        disabled ? "bg-gray-200 cursor-not-allowed text-gray-600" : ""
      }`}
    >
      {options.map((opt, index) => (
        <option key={`${opt.value}-${opt.label}-${index}`} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default DropdownList;
