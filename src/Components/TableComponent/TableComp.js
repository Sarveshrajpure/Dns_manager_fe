import React from "react";
import { AgGridReact } from "ag-grid-react"; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import "./TableComp.css";

const TableComp = ({
  columnDefs,
  rowData,
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
}) => {
  return (
    <div>
      <div
        className="ag-theme-quartz p-2" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default TableComp;
