import TableHeaderCell from "../../atoms/TableHeaderCell/TableHeaderCell";
import TableRow from "../../molecules/TableRow/TableRow";

export default function Table({ columns = [], data = [] }) {
  return (
    <table className="min-w-full table-fixed text-center border-collapse text-12 rounded-md shadow-md">
      <colgroup>
        {columns.map((col, index) => (
          <col key={"col_" + index} style={{ width: col.width || "150px" }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <TableHeaderCell key={"header_" + index}>
              {col.header}
            </TableHeaderCell>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <TableRow key={"row_" + index} rowData={row} columns={columns} />
          ))
        ) : (
          <tr>
            <td
              colSpan={columns.length}
              className="px-6 py-4 text-center text-gray-500"
            >
              No data found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
