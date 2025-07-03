export const DropdownOption = ({ key, value, label, isDefault }) => (
  <>
    {isDefault ? (
      <option key={key} value={value} selected>
        {label}
      </option>
    ) : (
      <option key={key} value={value}>{label}</option>
    )}
  </>
);
