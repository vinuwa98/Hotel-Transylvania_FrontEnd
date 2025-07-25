import React from "react";

function DropdownList(props) {
  const { name, value, onChange, required = false, options = [] } = props;

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
