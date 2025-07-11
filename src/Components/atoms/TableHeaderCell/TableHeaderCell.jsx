import { themeColors } from "../../../Theme/colors";

function TableHeaderCell({ children, className = "" }) {
  return (
    <th
      className={`px-6 py-3 font-medium text-white text-center ${className}`}
      style={{ backgroundColor: themeColors.DarkBlue }}
    >
      {children}
    </th>
  );
}

export default TableHeaderCell;
