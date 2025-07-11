function TableCell({ children, className = "" }) {
  return <td className={`px-6 py-4  ${className}`}>{children}</td>;
}

export default TableCell;
