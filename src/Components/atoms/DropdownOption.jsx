export const DropdownOption = ({ value, label, isDefault }) => (
  <>
    {isDefault ? (
      <option value={value} defaultValue>
        {label}
      </option>
    ) : (
      <option value={value}>{label}</option>
    )}
  </>
);
