import React from "react";
import Select from "react-select";

const MultiSelectDropdown = ({
  options,
  value,
  onChange,
  disabled = false,
}) => {
  return (
    <Select
      isMulti
      options={options}
      value={value}
      isDisabled={disabled}
      onChange={onChange}
      className="text-sm"
      classNamePrefix="select"
    />
  );
};

export default MultiSelectDropdown;
