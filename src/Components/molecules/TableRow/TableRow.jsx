import React from "react";

export default function TableRow({ rowData, columns }) {
  return (
    <tr className="text-center ">
      {columns.map((col, index) => {
        let content;

        if (col.renderCell) {
          try {
            content = col.renderCell(rowData);
          } catch (err) {
            console.error("Error in renderCell for column:", col.header, err);
            content = "Error";
          }
        } else {
          content = rowData[col.accessor];
        }

        // Defensive check: avoid rendering raw objects
        if (
          typeof content === "object" &&
          content !== null &&
          !React.isValidElement(content)
        ) {
          console.warn("Invalid table cell content:", content);
          content = JSON.stringify(content);
        }

        return (
          <td key={index} className="px-6 py-4 ">
            {content}
          </td>
        );
      })}
    </tr>
  );
}
