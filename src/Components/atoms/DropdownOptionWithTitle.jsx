export const DropdownOptionWithTitle = ({
  value,
  title,
  subtitle,
  isDefault,
}) => (
  <>
    {isDefault ? (
      <option value={value} defaultValue>
        <div style={{ flex: 1, flexDirection: "row", borderWidth: 2 }}>
          <div>
            <div style={{ fontWeight: "bold" }}>{title}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666" }}>{subtitle}</div>
          </div>
        </div>
      </option>
    ) : (
      <div style={{ flexDirection: "row", borderWidth: 2 }}>
        <option value={value}>
          <div>
            <div style={{ fontWeight: "bold" }}>{title}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#666" }}>{subtitle}</div>
          </div>
        </option>
      </div>
    )}
  </>
);
