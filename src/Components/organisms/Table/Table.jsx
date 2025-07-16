import TableHeaderCell from "../../atoms/TableHeaderCell/TableHeaderCell";
import TableRow from "../../molecules/TableRow/TableRow";

// Add default values for props
function Table({ columns = [], data = [] }) {
  return (
    <table className="min-w-full text-center border-collapse text-12 rounded-md shadow-md">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <TableHeaderCell key={index}>{col.header}</TableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <>
              <TableRow key={index} rowData={row} columns={columns} />{" "}
            </>
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="px-6 py-4 text-center text-gray-500"
            >
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
